import { useAccount } from "wagmi";
import { WalletOptions } from "./WalletOption";
function WalletConnect() {
  let { address, isConnected } = useAccount();
  return (
    <>
      {!isConnected && (
        <WalletOptions
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "4px",
            padding: "4px",
          }}
        />
      )}
      <div className="text-white text-sm sm:text-base md:text-lg text-center px-3 sm:px-6 break-all">
        Connected to :{" "}
        <span className="text-xs sm:text-sm md:text-base font-mono">
          {address}
        </span>
      </div>
    </>
  );
}

export default WalletConnect;
