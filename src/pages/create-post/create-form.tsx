import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}
export function CreateForm() {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Add a description"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
      upvotes: 1,
    });
    navigate('/');
  };
  return (
    <div className="input-field">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <div>
          <input type="text" placeholder="Title..." {...register("title")} />
          <p className="error">{errors.title?.message}</p>
        </div>
        <div>
          <textarea placeholder="Description..." {...register("description")} />
          {errors.description?.message && <p className="error">{errors.description.message}</p>}
        </div>
        <div id="buttonDiv">
          <input type="submit" id="inputButton" />
        </div>
      </form>
    </div>
  );
}
