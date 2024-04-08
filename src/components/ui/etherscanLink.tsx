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
      className="font-mono text-blue-400 underline"
      href={`https://etherscan.io/address/${ethereumAddress}`}
    >
      {displayedAddress}
    </a>
  );
}
