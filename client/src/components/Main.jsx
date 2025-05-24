// import React from "react";
// import ChatList from "./Chatlist/ChatList";
// import Empty from "./Empty";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "@/utils/FirebaseConfig";
// import { CHECK_USER } from "@/utils/ApiRoutes";
// import { Router } from "next/router";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useStateProvider } from "@/context/StateContext";
// import axios from "axios";
// import { reducerCases } from "@/context/constants";

// function Main() {
//   const router = useRouter();
// const[redirectLogin,setRedirectLogin] = useState(false);

// useEffect(() => {
//   if(redirectLogin){
//     router.push("/login");
//   }
// }, [redirectLogin]);

// const [{userInfo},dispatch] = useStateProvider();
//    onAuthStateChanged(firebaseAuth,async (currentUser) => {
//     if(!currentUser){
//       setRedirectLogin(true);
//     }
//     if(!userInfo && currentUser?.email){
//       const {data} =await axios.post(CHECK_USER,{
//         email: currentUser?.email
//       })
//     }
//     if(!data.status){
//       Router.push("/login");
//     }
//     const userData = data.data;
//               const{id,name,email,profilePicture:profileImage, status}= userData;
//                dispatch({
//                 type:reducerCases.SET_USER_INFO,
//                  userInfo:{
//                   id,name,email,profileImage,status,
//                 }
//    })
//   return (
//     <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
//       <ChatList/>
//       <Empty/>

//     </div>
//   );
// }

// export default Main;
import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter();
  const [redirectLogin, setRedirectLogin] = useState(false);

  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin, router]);

  useEffect(() => {
    // Subscribe to auth state changes once when component mounts
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) {
        setRedirectLogin(true);
        return;
      }

      if (!userInfo && currentUser?.email) {
        try {
          const { data } = await axios.post(CHECK_USER, {
            email: currentUser.email,
          });

          if (!data.status) {
            router.push("/login");
            return;
          }
          console.log({data});

          const userData = data.data;
          const { id, name, email, profilePicture, status } = userData;

          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage: profilePicture, // keep frontend naming consistent
              status,
            },
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push("/login");
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router, userInfo, dispatch]);

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />
      {
        currentChatUser?<Chat/>:<Empty/>
      }
      <Chat/>
    </div>
  );
}

export default Main;
