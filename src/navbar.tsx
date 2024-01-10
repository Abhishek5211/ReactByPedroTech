import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <div className="navbarcontainer">
      <ul>
        <Link className="links" to="/">
          <li>Home</li>
        </Link>
        {user ? (
          <Link className="links" to="/post">
            <li>Create Post</li>
          </Link>
        ) : (
          <Link className="links" to="/login">
            <li>Login</li>
          </Link>
        )}
      </ul>
      <div id="current-user">
        <p>{user?.displayName}</p>
        {user && (
          <img src={user?.photoURL || ""} alt={user?.displayName || ""}></img>
        )}
        {user && (
          <button name="signout" onClick={() => signOut(auth)}>
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
