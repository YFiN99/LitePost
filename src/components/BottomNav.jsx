import { NavLink } from "react-router-dom";

import {
    House,
    Search,
    SquarePen,
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

            {/* Create Post */}

            <button
                className="bottom-create"
                title="Create Post"
                onClick={() => {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }}
            >

                <SquarePen size={24} />

            </button>

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