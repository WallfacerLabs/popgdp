import "@rainbow-me/rainbowkit/styles.css";

import Link from "next/link";
import { urls } from "@/constants/urls";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { recoverMessageAddress } from "viem";
import { useAccount, useSignMessage, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";

import { Button } from "@/components/ui/button";
import { EtherscanLink } from "@/components/ui/etherscanLink";
import { FormFooter } from "@/components/ui/form";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { CrossIcon } from "@/components/icons/crossIcon";

import {
  addWalletAddressAction,
  removeWalletAddressAction,
} from "./walletActions";

const config = getDefaultConfig({
  appName: "POPGDP",
  projectId: "cec4e73ceb25170b43bd2dbf802a7f95",
  chains: [mainnet],
  ssr: true,
});

const queryClient = new QueryClient();

interface AssignWalletFormProps {
  ethereumAddress: string | null | undefined;
  decrementStep: () => void;
}

export function AssignWalletForm({
  ethereumAddress,
  decrementStep,
}: AssignWalletFormProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AddressForm ethereumAddress={ethereumAddress} />
          <FormFooter>
            <Button variant="secondary" onClick={decrementStep}>
              <ArrowIcon direction="left" /> Back
            </Button>
            <Button asChild>
              <Link href={urls.root}>Go to main page</Link>
            </Button>
          </FormFooter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function AddressForm({
  ethereumAddress,
}: Pick<AssignWalletFormProps, "ethereumAddress">) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  if (ethereumAddress) {
    return (
      <div className="flex flex-col gap-2 rounded-3xl border p-4">
        <div className="flex items-center gap-2 font-bold">
          <div className="h-2 w-2 rounded-full bg-green-300" />
          Wallet connected
        </div>
        <EtherscanLink ethereumAddress={ethereumAddress} />
        <Button
          variant="link"
          className="w-fit pl-0 text-red before:hover:bg-transparent"
          onClick={async () => {
            await removeWalletAddressAction();
          }}
        >
          <CrossIcon />
          Remove address
        </Button>
      </div>
    );
  }

  if (!address) {
    return <ConnectButton />;
  }

  return (
    <Button
      onClick={async () => {
        const message = `Sign this message to verify that you own ${address} ethereum address`;
        const signature = await signMessageAsync({ message });
        const recoveredAddress = await recoverMessageAddress({
          message,
          signature,
        });
        await addWalletAddressAction({
          addressMessageSignature: signature,
          addressMessage: message,
          ethereumAddress: recoveredAddress,
        });
      }}
    >
      Add ethereum address to your account
    </Button>
  );
}
