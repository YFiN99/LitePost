import { useEffect, useState } from "react";

import { connectWallet } from "../hooks/useWallet";

export default function WalletButton() {

  const [address, setAddress] = useState("");

  useEffect(() => {

    checkWallet();

  }, []);

  async function checkWallet() {

    if (!window.ethereum) return;

    try {

      const accounts = await window.ethereum.request({

        method: "eth_accounts",

      });

      if (accounts.length) {

        setAddress(accounts[0]);

      }

    } catch (err) {

      console.log(err);

    }

  }

  async function connect() {

    try {

      const wallet = await connectWallet();

      if (wallet) {

        setAddress(wallet.address);

      }

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <button

      className="wallet-btn"

      onClick={connect}

    >

      {

        address

          ?

          `${address.slice(0,6)}...${address.slice(-4)}`

          :

          "Connect Wallet"

      }

    </button>

  );

}