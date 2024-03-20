import { useState } from "react";

export default function Doctor() {
  const [form, setForm] = useState({
    doctorId: "",
    drug: "",
    quantity: "",
    date: "",
    recipient: "", // User input for the recipient
    password: "",
    dosage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password check
    if (form.password !== "FakeDoctor1@") {
      alert("Incorrect password");
      return;
    }

    // Format the recipient as required
    const formattedRecipient = `polygon:${form.recipient}`;

    // Prepare the payload excluding the password
    const { password, ...payload } = form;
    const credentialParams = {
      ...payload,
      recipient: formattedRecipient, // Updated recipient format
      credential: {
        subject: {
          doctorId: form.doctorId,
          drug: form.drug,
          quantity: form.quantity,
          dosage: form.dosage,
        },
        expiresAt: "2034-02-02", // Example expiration date, adjust as needed
      },
      metadata: {
        name: "Prescription",
        image: "https://solarplex-nft-frame.vercel.app/nft.png", // Example, replace with actual data
        description:
          "This credential verifies a prescription issued by a doctor.",
      },
    };

    // Making the API call to your Next.js backend
    try {
      const response = await fetch("/api/issue-prescription", {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input
        name="doctorId"
        value={form.doctorId}
        onChange={handleChange}
        placeholder="Doctor ID"
      />
      <input
        name="drug"
        value={form.drug}
        onChange={handleChange}
        placeholder="Drug Name"
      />
      <input
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <input
        name="dosage"
        value={form.dosage}
        onChange={handleChange}
        placeholder="Dosage"
      />
      <input
        name="date"
        value={form.date}
        onChange={handleChange}
        placeholder="Date"
        type="date"
      />
      <input
        name="recipient"
        value={form.recipient}
        onChange={handleChange}
        placeholder="Recipient"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Issue Credential</button>
    </form>
  );
}
