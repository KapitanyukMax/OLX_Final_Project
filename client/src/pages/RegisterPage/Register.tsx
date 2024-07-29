import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.ts";
import { doc, setDoc } from "firebase/firestore";
import React, { FormEvent } from "react";
import "./register.css";

const logGoogleUser = async () => {
  const response = await signInWithPopup(auth);
  console.log(response);
}

const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const { email, password, phone } = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
    phone: string;
  };

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      email,
      id: res.user.uid,
      phone,
    });
  } catch (err) {
    console.log(err);
  }
};

export const Register: React.FC = () => {
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <label htmlFor="phone">Phone</label>
        <input type="tel" name="phone" required />
        <button type="submit">REGISTER</button>
      </form>
      <div>
        <button onClick={logGoogleUser}>Sign In With Google</button>
      </div>
    </div>
  );
};
