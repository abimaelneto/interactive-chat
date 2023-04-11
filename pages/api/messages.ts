import { NextApiRequest, NextApiResponse } from "next";
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";
import { database } from "../../firebase.config";
import { ref, set } from "firebase/database";
import { v4 as uuid } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const command =new ListObjectsCommand({Bucket:'interactive-chat',})

}
