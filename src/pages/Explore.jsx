import { useEffect, useState } from "react";

import {

  getPosts,

} from "../hooks/useSocial";

import PostCard from "../components/PostCard";

export default function Explore() {

  const [posts,setPosts]=useState([]);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{

    load();

  },[]);

  async function load(){

    try{

      const data=

      await getPosts();

      setPosts(data);

    }catch(err){

      console.log(err);

    }

    setLoading(false);

  }

  return(

    <>

      <div className="card">

        <h2>

          Explore

        </h2>

        <p>

          Discover all public posts.

        </p>

      </div>

      {

        loading ?

        (

          <div className="card">

            Loading...

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