import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const handleMissingModule = (e) => {
    console.log("Missing module", e);
  };
  return (
    <Html>
      <script
        src="http://localhost:3001/_next/static/chunks/remoteEntry.js"
        onError={handleMissingModule}
        async
      />

      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
