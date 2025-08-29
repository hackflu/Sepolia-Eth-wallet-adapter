import { useAccount } from "wagmi";
import { useTransactions } from "./useTranscations";

export default function AllTranscations() {
  const { address } = useAccount();
  const { txs, loading } = useTransactions(address);

  if (!address) return <p className="text-gray-400">Connect your wallet first</p>;
  if (loading) return <p className="text-yellow-400">Loading transactions...</p>;

  return (
    <div className="text-white mt-4">
      <h2 className="font-bold text-lg">Past Transactions</h2>
      <ul className="mt-2 space-y-2">
        {txs.length === 0 && <li>No transactions found</li>}
        {txs.map((tx) => (
          <li
            key={tx.hash}
            className="p-2 rounded bg-gray-800 text-sm break-words"
          >
            <p>Hash: {tx.hash}</p>
            <p>
              From: {tx.from} → To: {tx.to}
            </p>
            {tx.value && <p>Value: {tx.value} {tx.asset}</p>}
            <p>Block: {parseInt(tx.blockNum, 16)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
