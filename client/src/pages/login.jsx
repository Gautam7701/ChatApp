import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { CHECK_USER } from "@/utils/ApiRoutes.js";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useEffect } from "react";



function Login() {
  const router= useRouter();

  const [{userInfo,newUser},dispatch]= useStateProvider();

  useEffect(() => {
    if(userInfo?.id && !newUser){
      router.push("/");
    }
  }, [userInfo,newUser]);
  
  const handlelogin = async() => {
    const provider = new GoogleAuthProvider();
    const {user:{displayName:name,email, photoURL:profileImage}}= await signInWithPopup(firebaseAuth, provider);
    try{
      if(email){
        const {data} = await axios.post(CHECK_USER, {email});
        console.log("API response from CHECK_USER:", data);
        

        
        if(!data.status){
          dispatch({
            type:reducerCases.SET_NEW_USER, newUser:true
          });
  
          dispatch({
            type:reducerCases.SET_USER_INFO, userInfo:{
              name,
              email,
              profileImage,
              status:"",
            }
          })
          router.push("/onboarding");
        }
        else{
          const userData = data.data;
          const{id,name,email,profilePicture:profileImage, status}= userData;
           dispatch({
            type:reducerCases.SET_USER_INFO,
             userInfo:{
              id,name,email,profileImage,status,
            }
          });
          dispatch({
      type: reducerCases.SET_NEW_USER,
      newUser: false, // 🔥 Important: ensures proper redirection
    });
          router.push("/");
        }
      }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center items-center bg-gradient-to-tr from-[#0f0f0f] via-[#1f1f1f] to-[#0f0f0f] h-screen w-screen flex-col gap-10 px-4">
      
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse drop-shadow-lg">
          <Image
            src="/whatsapp.gif"
            alt="logo"
            width={250}
            height={250}
            className="rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-wide">
          WizzApp
        </h1>
        <p className="text-gray-400 text-lg">Chat. Connect. Create your vibe ⚡</p>
      </div>

      <button className="flex items-center justify-center gap-5 px-6 py-4 bg-[#202c33] hover:bg-[#2c3c44] text-white rounded-xl shadow-lg hover:scale-105 transition duration-300 ease-in-out border border-white/10 backdrop-blur-sm" onClick={handlelogin}>
        <FcGoogle className="text-3xl" />
        <span className="text-xl font-medium">
          Sign in with Google
        </span>
      </button>
    </div>
  );
}

export default Login;
