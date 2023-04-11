import { NextApiRequest, NextApiResponse } from "next";

import { database } from "../../firebase.config";
import { ref, set } from "firebase/database";
import { v4 as uuid } from "uuid";
import { s3Client } from "../../api/services/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = uuid();
  try {
    set(ref(database, "messages/" + id), {
      type: "audio",
    });

    s3Client
      .send(
        new PutObjectCommand({
          Bucket: "interactive-chat",
          Key: `messages/${id}`,
          Body: req.read(),
        })
      )
      .then(() => res.status(200).send("Success"));
  } catch (err) {
    res.status(500).send("There was an error while saving your message");
  }
  // return fs.promises
  //   .writeFile("/tmp/test.mp3", req.read())
  //   .then((d) =>
  //     fs.promises.readFile("/tmp/test.mp3").then((data) => {
  //       return res.status(200).send(data);
  //     })
  //   )
  //   .catch((err) => {
  //     return res.status(500).send(err);
  //   });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
