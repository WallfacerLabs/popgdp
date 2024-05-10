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
import { recoverMessageAddress, UserRejectedRequestError } from "viem";
import {
  useAccount,
  useDisconnect,
  useSignMessage,
  WagmiProvider,
} from "wagmi";
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
  const { isConnected } = useAccount();

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

  if (!isConnected) {
    return <ConnectButton />;
  }

  return <SignMessageForm />;
}

function SignMessageForm() {
  const { disconnectAsync } = useDisconnect();
  const { address, status } = useAccount();
  const { error: signError, signMessageAsync } = useSignMessage();

  const handleSignMessage = useCallback(async () => {
    if (status !== "connected") {
      return;
    }

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
    await disconnectAsync();
  }, [address, signMessageAsync, status, disconnectAsync]);

  useEffect(() => {
    handleSignMessage();
  }, [handleSignMessage]);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Sign message to add ethereum address to your account.
      </p>

      {signError && (
        <p className="text-sm text-red">
          {getRejectionErrorMessage(signError)}
        </p>
      )}
      <Button onClick={handleSignMessage} className="w-fit">
        <EditSquareIcon />
        Sign message
      </Button>
    </>
  );
}

function getRejectionErrorMessage(error: Error) {
  if (error instanceof UserRejectedRequestError) {
    return "You need to sign the message to confirm your address";
  }
  return error.message;
}
