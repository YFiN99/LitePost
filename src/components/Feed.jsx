import { useEffect, useState } from "react";

import {
  getPosts,
} from "../hooks/useSocial";

import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

export default function Feed() {

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadPosts();

  }, []);

  async function loadPosts() {

    try {

      setLoading(true);

      const data = await getPosts();

      setPosts(data);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  return (

    <>

      <CreatePost

        onSuccess={loadPosts}

      />

      {

        loading ?

        (

          <div className="card">

            Loading posts...

          </div>

        )

        :

        posts.length === 0 ?

        (

          <div className="card">

            <h2>

              No posts yet

            </h2>

            <p>

              Publish the first post.

            </p>

          </div>

        )

        :

        posts.map((post)=>(

          <PostCard

            key={post.id}

            post={post}

            refresh={loadPosts}

          />

        ))

      }

    </>

  );

}