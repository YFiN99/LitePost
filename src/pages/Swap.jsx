import { ArrowRightLeft, Wallet, ShieldCheck, Zap } from "lucide-react";

export default function Swap() {

    return (

        <div className="swap-page">

            <div className="swap-hero">

                <div className="swap-icon">

                    <ArrowRightLeft size={42} />

                </div>

                <h1>LitePost Swap</h1>

                <p>
                    Universal DEX Aggregator for the EVM ecosystem.
                </p>

            </div>

            <div className="swap-card">

                <h2>Coming Soon</h2>

                <p>
                    The Swap module is currently under development.
                    Soon you'll be able to trade tokens across multiple
                    decentralized exchanges through one unified router.
                </p>

                <div className="swap-features">

                    <div className="feature">

                        <Wallet size={24} />

                        <div>

                            <h3>Wallet Connect</h3>

                            <p>
                                Connect any EVM wallet instantly.
                            </p>

                        </div>

                    </div>

                    <div className="feature">

                        <ArrowRightLeft size={24} />

                        <div>

                            <h3>Universal Swap</h3>

                            <p>
                                One router for multiple DEX protocols.
                            </p>

                        </div>

                    </div>

                    <div className="feature">

                        <Zap size={24} />

                        <div>

                            <h3>Best Route</h3>

                            <p>
                                Automatically select the most efficient trading path.
                            </p>

                        </div>

                    </div>

                    <div className="feature">

                        <ShieldCheck size={24} />

                        <div>

                            <h3>Secure Trading</h3>

                            <p>
                                Execute swaps directly from your wallet.
                            </p>

                        </div>

                    </div>

                </div>

                <button
                    className="swap-button"
                    disabled
                >

                    Launching Soon

                </button>

            </div>

        </div>

    );

}