"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";

interface FormState {
  doctorId: string;
  drug: string;
  quantity: string;
  date: string;
  recipient: string;
  password: string;
  dosage: string;
}

export default function Doctor() {
  const [form, setForm] = useState<FormState>({
    doctorId: "",
    drug: "",
    quantity: "",
    date: "",
    recipient: "",
    password: "",
    dosage: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== "FakeDoctor1@") {
      alert("Incorrect password");
      return;
    }

    const formattedRecipient = form.recipient;
    const credentialParams = {
      ...form,
      recipient: formattedRecipient,
      credential: {
        subject: {
          doctorId: form.doctorId,
          drug: form.drug,
          quantity: form.quantity,
          dosage: form.dosage,
        },
        expiresAt: "2034-02-02",
      },
      metadata: {
        name: "Prescription",
        image: "https://solarplex-nft-frame.vercel.app/nft.png",
        description:
          "This credential verifies a prescription issued by a doctor.",
      },
    };

    console.log("Sending credentialParams:", credentialParams);

    try {
      const response = await fetch("../api/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert("Credential issued successfully!");
    } catch (error) {
      console.error("Failed to issue credential:", error);
      alert("Failed to issue credential. See console for details.");
    }
  };

  return (
    <form
      className="flex flex-col bg-white rounded overflow-hidden shadow-lg p-4"
      onSubmit={handleSubmit}
    >
      {/* Form fields */}
      <input
        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="doctorId"
        value={form.doctorId}
        onChange={handleChange}
        placeholder="Doctor ID"
      />
      <input
        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="drug"
        value={form.drug}
        onChange={handleChange}
        placeholder="Drug Name"
      />
      <input
        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <input
        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="dosage"
        value={form.dosage}
        onChange={handleChange}
        placeholder="Dosage"
      />
      <input
        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="date"
        value={form.date}
        onChange={handleChange}
        placeholder="Date"
        type="date"
      />
      <input
        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="recipient"
        value={form.recipient}
        onChange={handleChange}
        placeholder="Recipient"
      />
      <input
        className="mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password to issue a Prescription. Use 'FakeDoctor1@'"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Issue Credential
      </button>
    </form>
  );
}
