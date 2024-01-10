import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Post from "./post";
import './main.css'

export interface Postv {
  id: string;
  userId: string;
  description: string;
  upvotes: number;
  title: string;
  username: string;
}
export function Main() {
  const [postList, setPostList] = useState<Postv[] | null>(null);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Postv[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);
  
  return (
    <div className="posts">
      {postList?.map((p) => 
       (<Post post={p}></Post>)
      )}
    </div>
  );
}
