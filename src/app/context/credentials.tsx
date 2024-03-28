"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
  getCredentialFromId,
  getCredentialCollections,
  CrossmintAPI,
  Lit,
} from "@crossmint/client-sdk-verifiable-credentials";

type NFT = {
  chain: string;
  contractAddress: string;
  locator: string;
  metadata: {
    name: string;
    description: string;
    credentialId: string;
    image: string;
    attributes?: any;
  };
  tokenId: string;
  tokenStandard: string;
};

export type Collection = {
  contractAddress: string;
  metadata?: any;
  nfts: NFT[];
};

type Wallet = {
  address: string;
};

type CredentialContextType = {
  collections: Collection[];
  retrieve: Function;
  decrypt: Function;
  verify: Function;
  wallet: Wallet;
  refreshCredentials: Function;
  hasPrescription: boolean;
  issuedPrescriptions: string[];
};

const CredentialContext = createContext<CredentialContextType | null>(null);

export function CredentialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [hasPrescription, setHasPrescription] = useState(false);
  const [issuedPrescriptions, setissuedPrescriptions] = useState<string[]>([]);

  const { primaryWallet: wallet } = useDynamicContext();
  const environment = process.env.NEXT_PUBLIC_CROSSMINT_ENV || "";

  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
    CrossmintAPI.init(clientKey, ["https://ipfs.io/ipfs/{cid}"]);

    getCollections(wallet?.address || "");
  }, [wallet]);

  const getCollections = async (wallet: string) => {
    const collections: any = wallet
      ? await getCredentialCollections("polygon", wallet, {}, environment)
      : [];

    const validContracts = [
      "0xD1298b95Eb5a9685035060A22D13DD8FbFA72e19", // student id
      //"0x010beF737dA4f831EaBAf0B6460e5b3Df32Ec9F5", // certificate
    ];

    const filtered = collections?.filter((obj: any) =>
      validContracts.includes(obj.contractAddress)
    );

    console.log("filtered:", filtered);
    setCollections(filtered || []);

    const prescriptionExists = collections?.some(
      (collection: any) =>
        collection.contractAddress ===
        "0xD1298b95Eb5a9685035060A22D13DD8FbFA72e19"
    );
    setHasPrescription(prescriptionExists || false);

    setissuedPrescriptions(prescriptionExists);
  };

  const retrieve = async (id: string) => {
    console.debug("retrieving credential with id: ", id);
    const credential = await getCredentialFromId(id, environment);
    console.debug("retrieve credential result: ", credential);
    if (
      credential != null &&
      credential?.payload == null &&
      credential?.credentialSubject != null
    ) {
      const subj = credential.credentialSubject;
      console.log(subj);
    }

    return credential;
  };

  const decrypt = async (credential: any) => {
    const lit = new Lit();
    console.debug("about to decrypt payload: ", credential.payload);
    const decrypted = await lit.decrypt(credential?.payload);
    console.debug("decrypt credential result: ", decrypted);

    return JSON.parse(decrypted); // this JSON.parse should be removed on next SDK update
  };

  const verify = async (credential: VerifiableCredential) => {
    console.debug("about to verify credential: ", credential);
    const verified = await verifyCredential(credential, environment);
    console.debug("verify credential result:", verified);

    return verified;
  };

  return (
    <CredentialContext.Provider
      value={{
        collections: collections || [],
        retrieve: retrieve,
        decrypt: decrypt,
        verify: verify,
        wallet: wallet || { address: "" },
        refreshCredentials: () => getCollections(wallet?.address || ""),
        hasPrescription: hasPrescription,
        issuedPrescriptions: issuedPrescriptions,
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
}

export function useCredentials() {
  return useContext(CredentialContext);
}
