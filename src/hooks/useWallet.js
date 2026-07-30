import { BrowserProvider } from "ethers";
import { CHAIN } from "../config/chain";

export async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return null;
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x" + CHAIN.chainId.toString(16),
        },
      ],
    });
  } catch (err) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + CHAIN.chainId.toString(16),
            chainName: CHAIN.chainName,
            rpcUrls: CHAIN.rpcUrls,
            blockExplorerUrls: CHAIN.blockExplorerUrls,
            nativeCurrency: CHAIN.nativeCurrency,
          },
        ],
      });
    } else {
      throw err;
    }
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return {
    provider,
    signer,
    address,
  };
}