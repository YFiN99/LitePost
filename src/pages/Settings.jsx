import {

  useState,

} from "react";

import {

  updateProfile,

} from "../hooks/useSocial";

export default function Settings() {

  const [bio,setBio]=

  useState("");

  const [avatar,setAvatar]=

  useState("");

  const [loading,setLoading]=

  useState(false);

  async function save(){

    try{

      setLoading(true);

      await updateProfile(

        bio,

        avatar

      );

      alert(

        "Profile updated."

      );

    }catch(err){

      console.log(err);

      alert(

        err.reason ||

        err.shortMessage ||

        err.message

      );

    }

    setLoading(false);

  }

  return(

    <div className="card">

      <h2>

        Settings

      </h2>

      <input

        className="input"

        placeholder="New Bio"

        value={bio}

        onChange={(e)=>

          setBio(

            e.target.value

          )

        }

      />

      <input

        className="input"

        placeholder="Avatar URL"

        value={avatar}

        onChange={(e)=>

          setAvatar(

            e.target.value

          )

        }

      />

      <button

        className="publish"

        disabled={loading}

        onClick={save}

      >

        {

          loading ?

          "Saving..."

          :

          "Save"

        }

      </button>

    </div>

  );

}