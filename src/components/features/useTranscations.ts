// useTransactions.ts
import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";

type Transfer = {
  blockNum: string;
  hash: string;
  from: string;
  to: string;
  value?: string;
  asset?: string;
};

export function useTransactions(address?: `0x${string}`) {
  const client = usePublicClient();
  const [txs, setTxs] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;

    async function fetchTxs() {
      setLoading(true);
      try {
        const res = await client.request({
          method: "alchemy_getAssetTransfers",
          params: [
            {
              fromBlock: "0x0",
              toBlock: "latest",
              fromAddress: address,
              toAddress: address,
              category: ["external", "erc20", "erc721", "erc1155"],
              withMetadata: true,
            },
          ],
        });
        setTxs(res.transfers || []);
      } catch (err) {
        console.error("Alchemy fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTxs();
  }, [address, client]);

  return { txs, loading };
}
