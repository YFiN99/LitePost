import { useEffect, useState } from "react";

import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  X
} from "lucide-react";

import {
  toggleLike,
  repost,
  commentPost,
  getComments
} from "../hooks/useSocial";

import "../styles/postcard.css";

export default function PostCard({

  post,

  refresh,

}) {

  const [showComment,setShowComment]=useState(false);

  const [loading,setLoading]=useState(false);

  const [comment,setComment]=useState("");

  const [comments,setComments]=useState([]);

  const [sending,setSending]=useState(false);

  async function loadComments(){

    try{

      setLoading(true);

      const data=await getComments(post.id);

      setComments(data);

    }catch(err){

      console.log(err);

    }finally{

      setLoading(false);

    }

  }

  useEffect(()=>{

    if(showComment){

      loadComments();

    }

  },[showComment]);

  async function like(){

    try{

      await toggleLike(post.id);

      refresh();

    }catch(err){

      console.log(err);

    }

  }

  async function repostPost(){

    try{

      await repost(post.id);

      refresh();

    }catch(err){

      console.log(err);

    }

  }

  async function submitComment(){

    if(!comment.trim()) return;

    try{

      setSending(true);

      await commentPost(

        post.id,

        comment

      );

      setComment("");

      await loadComments();

      refresh();

    }catch(err){

      console.log(err);

    }finally{

      setSending(false);

    }

  }  return(

    <>

      <div className="post-card">

        <div className="post-header">

          <div className="post-author">

            <div className="avatar">

              {post.author.slice(2,4).toUpperCase()}

            </div>

            <div className="author-info">

              <h3>

                {post.author.slice(0,6)}

                ...

                {post.author.slice(-4)}

              </h3>

              <span>

                {

                  new Date(

                    post.timestamp*1000

                  ).toLocaleString()

                }

              </span>

            </div>

          </div>

        </div>

        <div className="post-content">

          {post.contentUri}

        </div>

        {

          post.isRepost &&

          <div className="repost-tag">

            🔁 Repost of #

            {post.originalPostId}

          </div>

        }

        <div className="post-actions">

          <div className="action-left">

            <button

              className="action-btn like"

              onClick={like}

            >

              <Heart size={18}/>

              <span>

                {post.likesCount}

              </span>

            </button>

            <button

              className="action-btn comment"

              onClick={()=>setShowComment(true)}

            >

              <MessageCircle size={18}/>

              <span>

                {post.commentsCount}

              </span>

            </button>

            <button

              className="action-btn repost"

              onClick={repostPost}

            >

              <Repeat2 size={18}/>

              <span>

                {post.repostsCount}

              </span>

            </button>

          </div>

          <div className="post-stats">

            <span>

              <strong>

                {post.likesCount}

              </strong>

              {" "}Likes

            </span>

            <span>

              <strong>

                {post.commentsCount}

              </strong>

              {" "}Replies

            </span>

            <span>

              <strong>

                {post.repostsCount}

              </strong>

              {" "}Reposts

            </span>

          </div>

        </div>

      </div>      {

        showComment && (

          <div className="modal-overlay">

            <div className="comment-modal">

              <div className="modal-header">

                <h2>

                  Reply

                </h2>

                <button

                  className="close-btn"

                  onClick={()=>setShowComment(false)}

                >

                  <X size={20}/>

                </button>

              </div>

              <div className="modal-post">

                <div className="modal-author">

                  {post.author.slice(0,6)}

                  ...

                  {post.author.slice(-4)}

                </div>

                <div className="modal-content">

                  {post.contentUri}

                </div>

              </div>

              <div className="comment-form">

                <textarea

                  placeholder="Write your reply..."

                  value={comment}

                  maxLength={280}

                  onChange={(e)=>setComment(e.target.value)}

                />

                <div className="comment-footer">

                  <span>

                    {comment.length}/280

                  </span>

                  <div

                    style={{

                      display:"flex",

                      gap:12

                    }}

                  >

                    <button

                      className="cancel-btn"

                      onClick={()=>{

                        setComment("");

                        setShowComment(false);

                      }}

                    >

                      Cancel

                    </button>

                    <button

                      className="comment-submit"

                      disabled={

                        sending ||

                        !comment.trim()

                      }

                      onClick={submitComment}

                    >

                      {

                        sending

                        ?

                        "Posting..."

                        :

                        <>

                          <Send

                            size={16}

                          />

                          {" "}

                          Post Onchain

                        </>

                      }

                    </button>

                  </div>

                </div>

              </div>

              <div className="comment-box">

                {

                  loading

                  ?

                  (

                    <div className="post-loading"/>

                  )

                  :

                  comments.length===0

                  ?

                  (

                    <div

                      style={{

                        opacity:.6,

                        padding:"18px 0",

                        textAlign:"center"

                      }}

                    >

                      No comments yet.

                    </div>

                  )

                  :

                  comments.map((item,index)=>(

                    <div

                      key={index}

                      className="comment"

                    >

                      <div

                        className="comment-author"

                      >

                        {

                          item.author

                          ?

                          item.author.slice(0,6)

                          +"..."

                          +

                          item.author.slice(-4)

                          :

                          "Anonymous"

                        }

                      </div>

                      <div

                        className="comment-content"

                      >

                        {

                          item.content ||

                          item.contentUri ||

                          item.text

                        }

                      </div>

                    </div>

                  ))

                }

              </div>

            </div>

          </div>

        )

      }      {/* ===========================
          END COMMENT MODAL
      =========================== */}

    </>

  );

}