import {
  BrowserProvider,
  Contract,
} from "ethers";

import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "../config/contract";

import { connectWallet } from "./useWallet";

/* ==========================================
   WRITE CONTRACT
========================================== */

async function getWriteContract() {
  const wallet = await connectWallet();

  return new Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    wallet.signer
  );
}

/* ==========================================
   READ CONTRACT
========================================== */

async function getReadContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found.");
  }

  const provider = new BrowserProvider(
    window.ethereum
  );

  return new Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );
}

/* ==========================================
   PROFILE
========================================== */

export async function createProfile(
  handle,
  bio,
  avatar
) {
  const contract =
    await getWriteContract();

  const tx =
    await contract.createProfile(
      handle,
      bio,
      avatar
    );

  await tx.wait();

  return tx;
}

export async function updateProfile(
  bio,
  avatar
) {
  const contract =
    await getWriteContract();

  const tx =
    await contract.updateProfile(
      bio,
      avatar
    );

  await tx.wait();

  return tx;
}

export async function getProfile(
  address
) {
  const contract =
    await getReadContract();

  return await contract.profiles(
    address
  );
}

/* ==========================================
   POST
========================================== */

export async function createPost(
  content
) {
  const contract =
    await getWriteContract();

  const tx =
    await contract.createPost(
      content
    );

  await tx.wait();

  return tx;
}

export async function repost(
  postId
) {
  const contract =
    await getWriteContract();

  const tx =
    await contract.repost(
      postId
    );

  await tx.wait();

  return tx;
}

/* ==========================================
   LIKE
========================================== */

export async function toggleLike(
  postId
) {
  const contract =
    await getWriteContract();

  const tx =
    await contract.toggleLike(
      postId
    );

  await tx.wait();

  return tx;
}

/* ==========================================
   COMMENT
========================================== */

export async function commentPost(
  postId,
  content
) {
  const contract =
    await getWriteContract();

  const tx =
    await contract.commentPost(
      postId,
      content
    );

  await tx.wait();

  return tx;
}

export async function getComments(
  postId
) {
  const contract =
    await getReadContract();

  return await contract.getPostComments(
    postId
  );
}

/* ==========================================
   READ POSTS
========================================== */

export async function getTotalPosts() {
  const contract =
    await getReadContract();

  return Number(
    await contract.getTotalPosts()
  );
}

export async function getPost(id) {
  const contract =
    await getReadContract();

  return await contract.posts(id);
}

export async function getPosts() {
  const total =
    await getTotalPosts();

  const posts = [];

  for (
    let i = total;
    i >= 1;
    i--
  ) {
    const post =
      await getPost(i);

    posts.push({
      id: Number(post.id),
      author: post.author,
      contentUri:
        post.contentUri,
      timestamp: Number(
        post.timestamp
      ),
      likesCount: Number(
        post.likesCount
      ),
      repostsCount: Number(
        post.repostsCount
      ),
      commentsCount: Number(
        post.commentsCount
      ),
      isRepost:
        post.isRepost,
      originalPostId:
        Number(
          post.originalPostId
        ),
    });
  }

  return posts;
}

/* ==========================================
   EXTRA
========================================== */

export async function isLiked(
  postId,
  user
) {
  const contract =
    await getReadContract();

  return await contract.likes(
    postId,
    user
  );
}