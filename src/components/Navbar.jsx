import { Link } from "react-router-dom";

import WalletButton from "./WalletButton";

import logo from "../assets/logo/logo-dark.svg";

export default function Navbar({

  wallet,

  profile,

}) {

  return (

    <header className="header">

      <div>

        <Link
          to="/"
          className="navbar-logo"
        >

          <img
            src={logo}
            alt="LitePost"
            className="logo"
          />

        </Link>

        <div className="subtitle">

          Decentralized Social

        </div>

      </div>

      <div className="header-right">

        {

          profile?.handle && (

            <div className="user-info">

              <strong>

                @{profile.handle}

              </strong>

              <small>

                {wallet?.address?.slice(0,6)}

                ...

                {wallet?.address?.slice(-4)}

              </small>

            </div>

          )

        }

        <WalletButton />

      </div>

    </header>

  );

}