import { Stack } from "@mui/material";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <body>
        <Stack sx={{ width: "100vw", height: "100vh" }}>
          <Main />
          <NextScript />
        </Stack>
      </body>
    </Html>
  );
}
