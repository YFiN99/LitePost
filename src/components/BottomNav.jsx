import { NavLink } from "react-router-dom";

import {
    House,
    Search,
    Gem,
    User,
    Settings
} from "lucide-react";

import "./../styles/bottomnav.css";

export default function BottomNav() {

    return (

        <nav className="bottom-nav">

            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    isActive ? "bottom-item active" : "bottom-item"
                }
            >
                <House size={22} />
                <span>Home</span>
            </NavLink>

            <NavLink
                to="/explore"
                className={({ isActive }) =>
                    isActive ? "bottom-item active" : "bottom-item"
                }
            >
                <Search size={22} />
                <span>Explore</span>
            </NavLink>

            {/* Swap */}

            <NavLink
                to="/swap"
                className={({ isActive }) =>
                    isActive
                        ? "bottom-create active"
                        : "bottom-create"
                }
                title="Swap"
            >

                <Gem size={24} />

            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    isActive ? "bottom-item active" : "bottom-item"
                }
            >
                <User size={22} />
                <span>Profile</span>
            </NavLink>

            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    isActive ? "bottom-item active" : "bottom-item"
                }
            >
                <Settings size={22} />
                <span>Settings</span>
            </NavLink>

        </nav>

    );

}