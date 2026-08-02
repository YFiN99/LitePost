import "./styles/app.css";
import "./styles/navbar.css";
import "./styles/sidebar.css";
import "./styles/feed.css";
import "./styles/postcard.css";
import "./styles/profile.css";
import "./styles/explore.css";
import "./styles/settings.css";
import "./styles/responsive.css";
import "./styles/modal.css";
import "./styles/bottomnav.css";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Swap from "./pages/Swap";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import { connectWallet } from "./hooks/useWallet";
import { getProfile } from "./hooks/useSocial";

export default function App() {

    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState(null);
    const [profile, setProfile] = useState(null);
    const [profileExists, setProfileExists] = useState(false);

    useEffect(() => {
        initialize();
    }, []);

    async function initialize() {

        try {

            const w = await connectWallet();

            if (!w) {
                setLoading(false);
                return;
            }

            setWallet(w);

            await loadProfile(w.address);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    async function loadProfile(address) {

        try {

            const p = await getProfile(address);

            setProfile(p);

            setProfileExists(p?.exists ?? false);

        } catch (err) {

            console.log(err);

            setProfile(null);

            setProfileExists(false);

        }

    }

    async function refreshProfile() {

        if (!wallet) return;

        await loadProfile(wallet.address);

    }

    if (loading) {

        return (

            <div className="loading">

                Loading LitePost...

            </div>

        );

    }

    return (

    <div className="app">

        <Navbar
            wallet={wallet}
            profile={profile}
        />

        <div className="layout">

            <Sidebar />

            <main className="feed">

                <Routes>

                    <Route
                        path="/"
                        element={
                            <Home
                                wallet={wallet}
                                profile={profile}
                                profileExists={profileExists}
                                refreshProfile={refreshProfile}
                            />
                        }
                    />

                    <Route
                        path="/explore"
                        element={
                            <Explore
                                wallet={wallet}
                            />
                        }
                    />

                    <Route
                        path="/swap"
                        element={<Swap />}
                    />

                    <Route
                        path="/profile"
                        element={
                            <Profile
                                wallet={wallet}
                                profile={profile}
                                refreshProfile={refreshProfile}
                            />
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <Settings
                                wallet={wallet}
                            />
                        }
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Routes>

            </main>

            <aside className="rightbar">

                <div className="card">

                    <h3>Trending</h3>

                    <p>#LitePost</p>
                    <p>#Testnet</p>
                    <p>#Web3</p>
                    <p>#Blockchain</p>

                </div>

                <div className="card">

                    <h3>Network</h3>

                    <p>🟢 Testnet</p>

                    {wallet ? (
                        <p className="network-status">
                            Connected
                        </p>
                    ) : (
                        <p className="network-status offline">
                            Wallet Offline
                        </p>
                    )}

                    <hr />

                    <h3>Community</h3>

                    <a
                        href="https://x.com/Litepost_evm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="community-link"
                    >
                        𝕏 Follow @Litepost_evm
                    </a>

                                        <a
                        href="https://lite-post.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="community-link"
                    >
                        🌐 Visit Website
                    </a>

                </div>

            </aside>

        </div>

        {/* Mobile Bottom Navigation */}

        <BottomNav />

    </div>

    );

}