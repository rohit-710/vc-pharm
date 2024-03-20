import type { NextApiRequest, NextApiResponse } from "next";

interface PrescriptionRequestBody {
  doctorId: string;
  drug: string;
  quantity: string;
  date: string;
  recipient: string;
  password: string;
  dosage: string;
}

interface CrossmintApiResponse {
  message: string; // Adjust according to actual API response
}

// Define the handler for the POST method explicitly
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<CrossmintApiResponse | { message: string }>
) {
  const { doctorId, drug, quantity, date, recipient, password, dosage } =
    req.body as PrescriptionRequestBody;

  const crossmintApiKey = process.env.CROSSMINT_API_KEY || "";
  const collectionId = process.env.COLLECTION_ID || "default_collection_id";

  const credentialParams = {
    recipient: recipient,
    credential: {
      subject: { doctorId, drug, quantity, dosage },
      expiresAt: "2034-02-02",
    },
    metadata: {
      name: "Prescription Credential",
      image: "https://solarplex-nft-frame.vercel.app/nft.png",
      description:
        "This credential verifies a prescription issued by a doctor.",
    },
  };

  const options = {
    method: "POST",
    headers: {
      "X-API-KEY": crossmintApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentialParams),
  };

  try {
    const response = await fetch(
      `https://staging.crossmint.com/api/unstable/collections/${collectionId}/credentials`,
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        "API call failed with status:",
        response.status,
        "Details:",
        errorDetails
      );
      throw new Error(
        `API call failed with status: ${response.status}, Details: ${errorDetails}`
      );
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error issuing credential:", error);
    console.log("Request body:", credentialParams);
    return res
      .status(500)
      .json({ message: "Internal Server Error while issuing credential" });
  }
}
