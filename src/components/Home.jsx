import React from 'react'
import { auth, db } from '../config/Firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom/dist'

const Home = () => {
    const navigate = useNavigate("");
    const [ userDetails, setUserDetails ] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            }else{
                console.log("user is not logged in");
                toast.error("User is not logged in");
            }
        }); 
    };
    useEffect(()=>{
        fetchUserData();
    },[])

    async function handleLogout(){
        try {
            await auth.signOut();
            navigate("/login");
            toast("user logged out successfully");
        } catch (error) {
            console.log(error.message);
            toast.error("Error logging out");
        }
    }
  return (
    <div className='w-full flex flex-col justify-center items-center bg-[#f2f2f2] h-screen'>
      {userDetails ? (
        <>
        <h1>Welcome {userDetails.userName}</h1>
        <div className=" bg-white p-6 shadow-lg rounded-lg w-[90%] max-w-[705px]">
            <img src={userDetails.photo} width={"20%"} className=' rounded-full'/>
          <p>Email: {userDetails.email}</p>
          <p>Username: {userDetails.userName}</p>
          <button onClick={handleLogout} className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all ml-4'>Logout</button>
        </div>
        </>
      ):
        <p>Loading...</p>
      }
    </div>
  )
}

export default Home
