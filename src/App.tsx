import MainPage from "./components/pages/MainPage";
import { createConfig, http, WagmiProvider ,useAccount} from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";


export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(
      ""
    ),
  },
});

const queryClient = new QueryClient();



function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MainPage/>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
