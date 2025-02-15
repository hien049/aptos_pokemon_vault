import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { PokemonCollectionContainer } from "@/components/PokemonCollectionContainer.tsx";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

function App() {
  const { connected, network } = useWallet();
  const toast = useToast();

  useEffect(() => {
    if (network?.name && network?.name !== "testnet") {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: "Only Available on Testnet",
      });
    }
  }, [network?.name]);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center flex-col">
        {connected && network?.name === "testnet" ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              <PokemonCollectionContainer />
            </CardContent>
          </Card>
        ) : (
          <CardHeader>
            <CardTitle className={"text-white font-bold bg-black/40 rounded-xl py-3 px-5"}>
              To get started Connect a wallet
            </CardTitle>
          </CardHeader>
        )}
      </div>
    </>
  );
}

export default App;
