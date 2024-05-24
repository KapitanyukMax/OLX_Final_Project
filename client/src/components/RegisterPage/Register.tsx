import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import React, { FormEvent } from "react";
import "./register.css";

const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries()) as {
        email: string;
        password: string;
    };

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
            email,
            id: res.user.uid,
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
                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
};
