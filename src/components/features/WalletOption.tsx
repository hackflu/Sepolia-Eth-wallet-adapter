import type React from "react";
import { useConnect } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
type walletOptionProps = {
  style?: React.CSSProperties;
};

export function WalletOptions({ style }: walletOptionProps) {
  const { connectors, connect } = useConnect({
    mutation: {
      onError: (error) => {
       toast.error(`❌ Connection Failed: ${error.message}`);
     },

    }
  });

  return (
    <div>
    <div className="flex justify-center gap-2 mt-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          style={{ ...style }}
        >
          {connector.name}
        </button>
      ))}
    </div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
