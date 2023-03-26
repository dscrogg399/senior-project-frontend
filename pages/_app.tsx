import "./styles/globals.css";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Inter } from "next/font/google";
import NavBar from "../components/navigation/nav";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const validPages = ["/", "/reports", "/control", "/test"];

function HouseApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isValidPage = validPages.includes(router.pathname);
  return (
    <RecoilRoot>
      <div className={inter.className + " flex flex-col h-screen text-white"}>
        {isValidPage ? (
          <>
            <NavBar />
            <div className="flex flex-grow bg-gray-700 p-4">
              <Component {...pageProps} />
            </div>
          </>
        ) : (
          <div className="flex flex-grow bg-gray-700 p-4 overflow-hidden">
            <Component {...pageProps} />
          </div>
        )}
      </div>
    </RecoilRoot>
  );
}

export default HouseApp;
