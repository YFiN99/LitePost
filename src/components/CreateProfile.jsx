import { useState } from "react";

import {
  createProfile,
  getProfile,
} from "../hooks/useSocial";

import { connectWallet } from "../hooks/useWallet";

export default function CreateProfile({
  onSuccess,
}) {
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleCreateProfile() {

    if (handle.trim() === "") {
      alert("Handle is required.");
      return;
    }

    try {

      setLoading(true);

      // connect wallet
      const wallet = await connectWallet();

      // create profile
      await createProfile(
        handle.trim(),
        bio.trim(),
        avatar.trim()
      );

      // read latest profile from blockchain
      const profile = await getProfile(
        wallet.address
      );

      if (profile.exists) {

        alert("Profile created successfully!");

        if (onSuccess) {
          onSuccess(profile);
        }

      } else {

        alert(
          "Profile transaction succeeded but profile was not found."
        );

      }

    } catch (err) {

      console.error(err);

      alert(
        err.reason ||
        err.shortMessage ||
        err.message ||
        "Transaction failed."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="card">

      <h2>Create Your Profile</h2>

      <p>
        You must create a profile before publishing posts.
      </p>

      <input
        className="input"
        placeholder="Handle"
        value={handle}
        onChange={(e) =>
          setHandle(e.target.value)
        }
      />

      <input
        className="input"
        placeholder="Bio"
        value={bio}
        onChange={(e) =>
          setBio(e.target.value)
        }
      />

      <input
        className="input"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) =>
          setAvatar(e.target.value)
        }
      />

      <button
        className="publish"
        disabled={loading}
        onClick={handleCreateProfile}
      >
        {loading
          ? "Creating..."
          : "Create Profile"}
      </button>

    </div>

  );

}