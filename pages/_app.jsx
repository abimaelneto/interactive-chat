import { useRouter } from "next/router.js";
import { MainLayout } from "../src/layouts/Main.tsx";

export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
