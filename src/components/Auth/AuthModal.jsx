import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "/src/firebase.js";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl max-w-sm w-full relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 cursor-pointer"
          >
            <X />
          </button>

          <div className="flex justify-center mb-4 space-x-4">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded cursor-pointer ${
                isLogin ? "bg-pink-500 text-white" : "bg-gray-100"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded cursor-pointer ${
                !isLogin ? "bg-pink-500 text-white" : "bg-gray-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          <Dialog.Title className="text-xl font-bold mb-4 text-center">
            {isLogin ? "Login" : "Create an Account"}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600 cursor-pointer"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2 cursor-pointer"
            >
              Continue with Google
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AuthModal;
