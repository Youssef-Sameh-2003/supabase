import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/skybase/server";
import ConnectSkybaseSteps from "@/components/tutorial/ConnectSkybaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";

export default async function Index() {
  const canInitSkybaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Skybase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSkybaseConnected = canInitSkybaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {isSkybaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSkybaseConnected ? <SignUpUserSteps /> : <ConnectSkybaseSteps />}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://skybase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Skybase
          </a>
        </p>
      </footer>
    </div>
  );
}
