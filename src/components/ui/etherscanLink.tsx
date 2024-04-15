interface EtherscanLinkProps {
  ethereumAddress: string;
  short?: boolean;
}

export function EtherscanLink({
  ethereumAddress,
  short = false,
}: EtherscanLinkProps) {
  const displayedAddress = short
    ? ethereumAddress.slice(0, 4) + "..." + ethereumAddress.slice(-4)
    : ethereumAddress;

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="w-fit rounded font-mono text-blue-400 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      href={`https://etherscan.io/address/${ethereumAddress}`}
    >
      {displayedAddress}
    </a>
  );
}
