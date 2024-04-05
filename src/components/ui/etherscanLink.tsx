interface EtherscanLinkProps {
  ethereumAddress: string;
}

export function EtherscanLink({ ethereumAddress }: EtherscanLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-blue-400 underline"
      href={`https://etherscan.io/address/${ethereumAddress}`}
    >
      {ethereumAddress}
    </a>
  );
}
