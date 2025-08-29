import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletConnect from "../features/WalletConnect";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllTranscations from "../features/AllTranscations"
function MainPage() {
  const { sendTransaction } = useSendTransaction();
  let [address, setAddress] = useState("");
  let [value, setValue] = useState(0);

  function handleClick(value: string, address: string) {
    if (value === "" || address === "") {
      toast.error("Please enter both Address and Amount!");
      return;
    }

    try {
      const normalizeAddress = address.startsWith("0x")
        ? address
        : `0x${address}`;

      sendTransaction({
        to: normalizeAddress as `0x${string}`,
        value: parseEther(value),
      });

      toast.success("Transaction Sent Successfully 🚀");
    } catch (error: any) {
      toast.error(`Transaction Failed ❌: ${error.message || error}`);
    }
  }

  return (
    <>
      <div className="container mx-auto mt-10 px-4">
        <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl border-4 border-white p-6 sm:p-8 md:p-10">
          <header>
            <h1 className="text-white font-medium text-2xl sm:text-3xl text-center">
              Ether Wallet Adapter
            </h1>
            <div className="bg-white w-full h-1 mt-2"></div>
          </header>

          <div className="mt-4">
            <WalletConnect />
          </div>

          <Tabs defaultValue="wallet" className="w-full mt-4">
            <TabsList className="flex justify-center gap-2">
              <TabsTrigger
                value="wallet"
                className="flex-1 sm:flex-none data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="transcation"
                className="flex-1 sm:flex-none data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Transaction
              </TabsTrigger>
            </TabsList>


            <TabsContent value="wallet" className="text-white">
              <div className="flex flex-col gap-3 mt-3">
                <input
                  type="text"
                  placeholder="Enter your Address"
                  className="bg-white text-gray-800 w-full rounded-md p-2 text-sm sm:text-base"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Enter the Eth"
                  className="bg-white text-gray-800 w-full rounded-md p-2 text-sm sm:text-base"
                  max={10}
                  min={0}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
                <button
                  className="bg-blue-500 p-2 sm:p-3 rounded-md text-white text-sm sm:text-base hover:bg-blue-600 transition"
                  onClick={() => handleClick(value.toString(), address)}
                >
                  Send Eth
                </button>
              </div>
            </TabsContent>

            <TabsContent value="transcation" className="text-white">
              <AllTranscations/>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default MainPage;
