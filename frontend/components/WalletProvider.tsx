import { PropsWithChildren } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// Internal components
import { useToast } from "@/components/ui/use-toast";
import { PetraWallet } from "petra-plugin-wallet-adapter";
// Internal constants
import { NETWORK } from "@/constants";

export function WalletProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const wallets = [new PetraWallet()];

  return (
    <AptosWalletAdapterProvider
      autoConnect={false}
      dappConfig={{ network: NETWORK }}
      plugins={wallets}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
