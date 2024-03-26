import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Assuming the structure of the request body matches the PrescriptionRequestBody interface
interface PrescriptionRequestBody {
  doctorId: string;
  drug: string;
  quantity: string;
  date: string;
  recipient: string;
  password: string;
  dosage: string;
}

// Define the handler for the POST method
export async function POST(req: NextRequest) {
  const body = await req.json();

  const crossmintApiKey = process.env.CROSSMINT_API_KEY || "";
  const collectionId = process.env.COLLECTION_ID || "default_collection_id";

  const credentialParams = {
    recipient: `polygon:${body.recipient}`,
    credential: {
      subject: {
        doctorId: body.doctorId,
        drug: body.drug,
        quantity: body.quantity,
        dosage: body.dosage,
      },
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
      return new NextResponse(
        JSON.stringify({
          message: `API call failed with status: ${response.status}, Details: ${errorDetails}`,
        }),
        { status: 500 }
      );
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error issuing credential:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error while issuing credential",
      }),
      { status: 500 }
    );
  }
}
