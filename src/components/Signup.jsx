import React from 'react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom/dist'
import { auth, db } from '../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Signup = () => {

    const navigate = useNavigate("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
         await createUserWithEmailAndPassword(auth, email, password);
         const user = auth.currentUser;
         console.log(user);
         if(user){
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                userName: username,
                photo: "",
            });
         }
         console.log("User Registered Successfully");
         toast.success("User Registered Successfully")
         navigate("/login");
        } catch(error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }
  return (
    <div className='w-full flex flex-col justify-center items-center bg-[#f2f2f2] h-screen'>
      <div className=" bg-white p-6 shadow-lg rounded-lg w-[90%] max-w-[705px]">
        <div className="form mt-3 block">
            <form className='mb-4 w-full' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Username">Username:</label>
                    <input type='name'
                    placeholder='Enter Username'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-2 w-full border-2 border-gray-500 rounded px-4 "/><br required/>
                </div>

                <div>
                    <label htmlFor="Email">Email:</label>
                    <input type="email" 
                    placeholder='Enter Email' 
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='mb-2 w-full border-2 border-gray-500 rounded px-4' required/><br />
                </div>

                <div>
                    <label htmlFor="Password">Password:</label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='mb-2 w-full border-2 border-gray-500 rounded px-4' required/><br />
                </div>

                <div>
                    <label htmlFor="Password">Confirm Password:</label>
                    <input type="password" 
                    placeholder='Confirm Password' 
                    name='confirmpassword'
                    className='mb-2 w-full border-2 border-gray-500 rounded px-4'/><br />
                </div>
                <p>Already have an account? <Link to='/login' className='text-blue-400'>Log in</Link> </p>

                <div className="mt-3">
                    <button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-all'>Sign up</button>
                </div>

            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
