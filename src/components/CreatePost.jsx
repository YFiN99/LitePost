import {

  useState,

} from "react";

import {

  createPost,

} from "../hooks/useSocial";

export default function CreatePost({

  onSuccess,

}) {

  const [content,setContent]=useState("");

  const [loading,setLoading]=useState(false);

  async function publish(){

    if(content.trim()===""){

      alert("Write something.");

      return;

    }

    try{

      setLoading(true);

      await createPost(

        content.trim()

      );

      setContent("");

      if(onSuccess){

        await onSuccess();

      }

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

    <div className="post-box">

      <h2>

        What's happening?

      </h2>

      <textarea

        value={content}

        placeholder="Share something..."

        onChange={(e)=>

          setContent(

            e.target.value

          )

        }

      />

      <button

        className="publish"

        disabled={loading}

        onClick={publish}

      >

        {

          loading ?

          "Publishing..."

          :

          "Publish"

        }

      </button>

    </div>

  );

}