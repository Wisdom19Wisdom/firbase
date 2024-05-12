import React from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom/dist';
import { auth, db } from '../config/Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function googleLogin(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result);
            const user = result.user;
            if(result.user){
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    userName: user.displayName,
                    photo: user.photoURL,
                });
                toast.success("User logged in successfully");
                navigate("./home");
            }
    })
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            toast.success("User logged in successfully");
            navigate("/home");
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    
  return (
    <div className='container w-full flex flex-col justify-center items-center bg-[#f2f2f2] h-screen'>
      <div className=" bg-white p-6 shadow-lg rounded-lg w-[90%] max-w-[705px] ">
        <div className='form mt-3 block'>
            <form className='mb-4 w-full' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Email" className= "">Email Address:</label>
                    <input type='email'
                    placeholder='Enter Email Address'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2 w-full border-2 border-gray-500 rounded" required/><br  />
                </div>

                <div>
                    <label htmlFor="Password" className= "">Password:</label>
                    <input type='password'
                    placeholder='Enter your password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-2 w-full border-2 border-gray-500 rounded" required/><br />
                </div>

                <div className="mt-3">
                    <button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-[30px] hover:bg-blue-400 transition-all'>Log in</button>
                    <p>If you don't have an account <Link to='/signup' className='text-blue-400'>Sign up</Link> </p>
                </div>


                <p className='text-center'>Or</p>

                <div className='text-center flex justify-center cursor-pointer w-full bg-[#dcd8d8] p-2' onClick={googleLogin}><span className=' mt-1 px-2'><FaGoogle/> </span><p>Sign in with google</p></div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
