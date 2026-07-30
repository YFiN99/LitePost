import { useEffect, useState } from "react";

import {
  connectWallet,
} from "../hooks/useWallet";

import {
  getProfile,
  updateProfile,
} from "../hooks/useSocial";

export default function ProfileModal({
  open,
  onClose,
}) {

  const [wallet, setWallet] = useState("");

  const [handle, setHandle] = useState("");

  const [bio, setBio] = useState("");

  const [avatar, setAvatar] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if(open){

      loadProfile();

    }

  },[open]);

  async function loadProfile(){

    try{

      const w = await connectWallet();

      setWallet(w.address);

      const profile = await getProfile(w.address);

      setHandle(profile.handle);

      setBio(profile.bio);

      setAvatar(profile.avatarUri);

    }catch(err){

      console.error(err);

    }

  }

  async function saveProfile(){

    try{

      setLoading(true);

      await updateProfile(

        bio,

        avatar

      );

      alert("Profile updated successfully.");

      onClose();

    }catch(err){

      console.error(err);

      alert(

        err.reason ||

        err.shortMessage ||

        err.message

      );

    }finally{

      setLoading(false);

    }

  }

  if(!open){

    return null;

  }

  return(

    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>

            Edit Profile

          </h2>

          <button

            className="close-btn"

            onClick={onClose}

          >

            ✕

          </button>

        </div>

        <div className="modal-body">

          <label>

            Wallet

          </label>

          <input

            className="input"

            value={wallet}

            disabled

          />

          <label>

            Handle

          </label>

          <input

            className="input"

            value={handle}

            disabled

          />

          <label>

            Bio

          </label>

          <textarea

            className="input"

            rows="4"

            value={bio}

            onChange={(e)=>setBio(e.target.value)}

          />

          <label>

            Avatar URL

          </label>

          <input

            className="input"

            value={avatar}

            onChange={(e)=>setAvatar(e.target.value)}

          />

          {

            avatar &&

            <div
              style={{
                marginTop:20,
                textAlign:"center"
              }}
            >

              <img

                src={avatar}

                alt="avatar"

                style={{
                  width:90,
                  height:90,
                  borderRadius:"50%",
                  objectFit:"cover"
                }}

                onError={(e)=>{

                  e.target.style.display="none";

                }}

              />

            </div>

          }

        </div>

        <div className="modal-footer">

          <button

            className="publish"

            onClick={saveProfile}

            disabled={loading}

          >

            {

              loading

              ?

              "Saving..."

              :

              "Save Profile"

            }

          </button>

        </div>

      </div>

    </div>

  );

}