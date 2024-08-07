import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(login({email}));
      setEmail("");
      setPassword("");
      console.log('login successfull')  // Giriş yaptıktan sonra haberler ekranına yönlendirme
      console.log('auth',auth)
      navigate("/");  
    } catch (err) {
      setError(err.message);
      console.log('login failed')
      alert('Login failed')
    }
  };
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-pink-500 rounded hover:bg-pink-600"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col">
            <p className="text-sm font-light text-gray-500 ">Don't you have an account? <Link to='/register' className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sign Up</Link></p>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};
export default Login;