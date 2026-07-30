import { NavLink } from "react-router-dom";

export default function Sidebar() {

  return (

    <aside className="sidebar">

      <NavLink

        to="/"

        end

        className={({isActive})=>

          isActive

          ?

          "menu active"

          :

          "menu"

        }

      >

        🏠 Home

      </NavLink>

      <NavLink

        to="/explore"

        className={({isActive})=>

          isActive

          ?

          "menu active"

          :

          "menu"

        }

      >

        🔍 Explore

      </NavLink>

      <NavLink

        to="/profile"

        className={({isActive})=>

          isActive

          ?

          "menu active"

          :

          "menu"

        }

      >

        👤 Profile

      </NavLink>

      <NavLink

        to="/settings"

        className={({isActive})=>

          isActive

          ?

          "menu active"

          :

          "menu"

        }

      >

        ⚙ Settings

      </NavLink>

    </aside>

  );

}