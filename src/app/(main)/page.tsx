"use client";

import React, { useState, useRef } from "react";
import { useCredentials } from "@context/credentials";
import Link from "next/link";
import PrescriptionCard from "../components/PrescriptionCard";
import { FaBookDead, FaGithub } from "react-icons/fa";
import { SiW3C } from "react-icons/si";

import { redirect } from "next/dist/server/api-utils";

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const credentialContext = useCredentials();
  const formRef = useRef<HTMLFormElement>(null);
  const walletAddress = credentialContext?.wallet?.address;

  const openSignup = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mt-8 mb-4">Welcome to the dPharm</h1>
        <p className="text-lg mb-8">
          Doctors can issue their patients prescriptions as verifiable
          Credentials and patients can view all their issued prescriptions and
          verify them at the Pharmacy.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mb-8 relative flex">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Get Started</h2>
            <p className="mb-4 max-w-xl">
              To get started with the demo assume that you are a Doctor who
              wants to issue their patient a prescription as a verifiable
              credential. Head over to Doctor to issue a verifiable credential.
            </p>
            <Link href="/courses">
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text--2xl font-bold py-4 px-6 rounded">
                Create a Prescription
              </button>
            </Link>
          </div>
          <div className="ml-6">
            <PrescriptionCard />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Ready to build?</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 p-6 rounded-lg relative">
            <h3 className="font-bold mb-2">Docs</h3>
            <FaBookDead
              title="Docs link"
              className="absolute top-7 right-7 text-2xl"
            />
            <a
              href="https://docs.crossmint.com/verifiable-credentials/quickstart"
              target="_blank"
              className="text-blue-500"
            >
              Check out the Docs
            </a>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg relative">
            <h3 className="font-bold mb-2">GitHub Repo</h3>
            <FaGithub
              title="Github link"
              className="absolute top-7 right-7 text-2xl"
            />
            <a
              href="https://github.com/Crossmint/verifiable-credentials-demo"
              target="_blank"
              className="text-blue-500"
            >
              Go to GitHub Repo
            </a>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg relative">
            <h3 className="font-bold mb-2">W3C Standard</h3>
            <SiW3C
              title="W3C link"
              className="absolute top-7 right-7 text-2xl"
            />
            <a
              href="https://www.w3.org/TR/vc-data-model-2.0/"
              target="_blank"
              className="text-blue-500"
            >
              Learn about the W3C Verifiable Credentials Standard
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Verifying Prescription with another Pharmacy
        </h2>

        <div className="bg-gray-100 p-6 rounded-lg mb-8 relative flex">
          <p className="flex-1 text-lg mb-8">
            The credentials that are issued to you by dPharm. They can also be
            used as prerequisites at other Pharmacies that implement the
            verifiable credential standard.
          </p>
          <br />

          <Link href="/pharmacy">
            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white text--2xl font-bold py-4 px-6 rounded">
              Verify at a Pharmacy
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Content;
