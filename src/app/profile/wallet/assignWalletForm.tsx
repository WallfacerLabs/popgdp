import "@rainbow-me/rainbowkit/styles.css";

import { useCallback, useEffect } from "react";
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
import { EditSquareIcon } from "@/components/icons/editSquareIcon";

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
          <div className="flex flex-col gap-6">
            <AddressForm ethereumAddress={ethereumAddress} />
            <FormFooter>
              <Button variant="secondary" onClick={decrementStep}>
                <ArrowIcon direction="left" /> Back
              </Button>
              <Button asChild>
                <Link href={urls.root}>Go to main page</Link>
              </Button>
            </FormFooter>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function AddressForm({
  ethereumAddress,
}: Pick<AssignWalletFormProps, "ethereumAddress">) {
  const { address, isConnected } = useAccount();
  const { error: signError, signMessageAsync } = useSignMessage();

  const handleSignMessage = useCallback(async () => {
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
  }, [address, signMessageAsync]);

  useEffect(() => {
    if (isConnected && !ethereumAddress) {
      handleSignMessage();
    }
  }, [ethereumAddress, isConnected, signMessageAsync, handleSignMessage]);

  if (!isConnected) {
    return <ConnectButton />;
  }

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

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Sigh message to add ethereum address to your account.
      </p>

      {signError && <p className="text-sm text-red">{signError.message}</p>}
      <Button onClick={handleSignMessage} className="w-fit">
        <EditSquareIcon />
        Sign message
      </Button>
    </>
  );
}
