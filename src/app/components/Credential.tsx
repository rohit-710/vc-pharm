import React, { useState } from "react";
import { useCredentials } from "@context/credentials";
import { FaCheckCircle } from "react-icons/fa";

interface CredentialProps {
  credentialId: string;
  imageUrl: string;
  title: string;
  description: string;
  setIsProcessing: Function;
}

interface CredentialSubject {
  // Updated structure based on your credentialSubject
  doctorId: string;
  dosage: string;
  drug: string;
  quantity: string;
}

const Credential: React.FC<CredentialProps> = ({
  credentialId,
  imageUrl,
  title,
  description,
  setIsProcessing,
}) => {
  const [isValid, setIsValid] = useState<boolean>();
  const [credentialSubject, setCredentialSubject] =
    useState<CredentialSubject | null>(null);
  const credentialContext = useCredentials();

  const retrieveCredential = async () => {
    setIsProcessing(true);

    try {
      const credential = await credentialContext?.retrieve(credentialId);
      const verified = await credentialContext?.verify(credential);

      if (verified.validVC) {
        setCredentialSubject(credential.credentialSubject);
      }

      setIsValid(verified.validVC);
    } catch (e) {
      setIsValid(false);
      setCredentialSubject(null); // Clear on failure
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex rounded overflow-hidden shadow-lg bg-white">
      <img src={imageUrl} alt="credential image" className="w-64 h-auto" />
      <div className="px-6 py-4 flex flex-col justify-between">
        <div>
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>

        {isValid ? (
          <>
            <div className="flex items-center bg-green-200 text-green-700 mt-4 py-2 px-4 rounded">
              <FaCheckCircle className="mr-2" />
              <span>Verified</span>
            </div>
            {/* Credential Subject Information Styled with Tailwind CSS */}
            <div className="mt-4 p-4 bg-gray-100 rounded shadow">
              {credentialSubject && (
                <ul className="list-disc space-y-2">
                  <p>Issued Prescription:</p>
                  <li>
                    Doctor ID:{" "}
                    <span className="font-semibold">
                      {credentialSubject.doctorId}
                    </span>
                  </li>
                  <li>
                    Dosage:{" "}
                    <span className="font-semibold">
                      {credentialSubject.dosage}
                    </span>
                  </li>
                  <li>
                    Drug:{" "}
                    <span className="font-semibold">
                      {credentialSubject.drug}
                    </span>
                  </li>
                  <li>
                    Quantity:{" "}
                    <span className="font-semibold">
                      {credentialSubject.quantity}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={retrieveCredential}
          >
            Verify Credential
          </button>
        )}
      </div>
    </div>
  );
};

export default Credential;
