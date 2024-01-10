import React from "react";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from '../config/firebase';
import { useNavigate } from "react-router-dom";
export function Login()
{
    const navigate = useNavigate();

    return <div>
        <h2>Sign In With Google</h2>
        <button onClick={async (e)=>{await signInWithPopup(auth,provider);navigate('/')}}>Sign In</button>
    </div>;
}