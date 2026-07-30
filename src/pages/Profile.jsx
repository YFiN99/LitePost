import { useEffect, useState } from "react";

import {

  getPosts,

} from "../hooks/useSocial";

import PostCard from "../components/PostCard";

export default function Profile({

  wallet,

  profile,

}) {

  const [posts,setPosts]=useState([]);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{

    load();

  },[]);

  async function load(){

    try{

      const all=

      await getPosts();

      const mine=

      all.filter(

        p=>

        p.author.toLowerCase()

        ===

        wallet.address.toLowerCase()

      );

      setPosts(mine);

    }catch(err){

      console.log(err);

    }

    setLoading(false);

  }

  return(

    <>

      <div className="card">

        <h2>

          @{profile?.handle}

        </h2>

        <p>

          {profile?.bio}

        </p>

        <small>

          {wallet.address}

        </small>

      </div>

      {

        loading ?

        (

          <div className="card">

            Loading...

          </div>

        )

        :

        posts.length===0 ?

        (

          <div className="card">

            No posts yet.

          </div>

        )

        :

        posts.map((post)=>(

          <PostCard

            key={post.id}

            post={post}

            refresh={load}

          />

        ))

      }

    </>

  );

}