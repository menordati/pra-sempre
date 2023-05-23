import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const { base64img, contentType } = await request.json();

  if (!base64img) {
    return NextResponse.json({ message: "Error" });
  }

  // Captura a extensão para construção da URL
  const result = contentType.split("/");
  const fileExt = result[result.length - 1];

  // Constroi dados dinâmicos para URL
  const objectKey = `${uuidv4()}.${fileExt}`;
  const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    region: "sa-east-1",
  });

  await s3
    .putObject({
      Bucket: BUCKET_NAME || "",
      Body: Buffer.from(
        base64img!.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
      Key: objectKey,
      ContentEncoding: "base64",
      ContentType: contentType,
    })
    .promise();

  return NextResponse.json({
    imageUrl: `https://${BUCKET_NAME}.s3.sa-east-1.amazonaws.com/${objectKey}`,
  });
}
