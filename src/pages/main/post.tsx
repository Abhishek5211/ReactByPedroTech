import React, { useEffect, useState } from "react";
import { Postv } from "./main";
import "./post.css";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getDocs,
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Props {
  post: Postv;
}
interface Like {
  userId: string;
  likeId: string;
}
export default function Post(prop: Props) {
  const [likes, setLikes] = useState<Like[] | null>(null);

  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", prop.post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((dat) => ({
        userId: dat.data().userId,
        likeId: dat.id,
      })) as Like[]
    );
  };
  const addLikes = async () => {
    if (hasUserLiked) {
      deleteLike();
      return;
    }
    const newDoc = await addDoc(likesRef, {
      userId: user?.uid,
      postId: prop.post.id,
    });
    if (user)
      setLikes((prev) =>
        prev
          ? [...prev, { userId: user.uid, likeId: newDoc.id }]
          : [{ userId: user.uid, likeId: newDoc.id }]
      );
  };
  useEffect(()=>{
    getLikes();
  },[]);
  const deleteLike = async () => {
    let likeId: string;
    try {
      const likeDeleteRef = query(
        likesRef,
        where("postId", "==", prop.post.id),
        where("userId", "==", user?.uid)
      );
      const linkDeleteData = await getDocs(likeDeleteRef);
      likeId = linkDeleteData.docs[0].id;
      const linkToDelete = doc(db, "likes", linkDeleteData.docs[0].id);
      await deleteDoc(linkToDelete);
    } catch (e) {
      console.log(e);
    } finally {
      setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
    }
  };
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  return (
    <div className="post">
      <div>
        <h3 className="username">@{prop.post.username}</h3>
      </div>
      <div>
        <h3 className="title">{prop.post.title}</h3>
      </div>
      <div>
        <p className="description">{prop.post.description}</p>
      </div>
      <div>
        <button className="like" onClick={addLikes}>
          {hasUserLiked ? <>&#x270C;</> : <>&#128078;</>}
        </button>
        <p className="upvotes">{likes?.length}</p>
      </div>
    </div>
  );
}
