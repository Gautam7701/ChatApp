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
import { GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import Chat from "./Chat/Chat";
import { useRef } from "react";
import { io } from "socket.io-client";
import { HOST } from "@/utils/ApiRoutes.js";
import SearchMessages from "./Chat/SearchMessages.jsx";
import VideoCall from "./Call/VideoCall";
import VoiceCall from "./Call/VoiceCall";
import IncomingVideoCall from "./common/IncomingVideoCall";
import IncomingCall from "./common/IncomingCall";

function Main() {
  const router = useRouter();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false);
  const socket = useRef();

  const [{ userInfo, currentChatUser, messagesSearch, voicecall, videocall, incomingVoiceCall, incomingVideoCall }, dispatch] =
    useStateProvider();

  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin, router]);

  useEffect(() => {
    // Subscribe to auth state changes once when component mounts
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {
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
            console.log({ data });

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
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router, userInfo, dispatch]);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data) => {
        console.log("Message received:", data);
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });

      socket.current.on("incoming-voice-call",({from,roomId,callType})  =>{
        dispatch({
          type:reducerCases.SET_INCOMING_VOICE_CALL,
          incomingVoiceCall:{...from,roomId, callType}
        })
      })

      socket.current.on("incoming-video-call",({from,roomId,callType})  =>{
        dispatch({
          type:reducerCases.SET_INCOMING_VIDEO_CALL,
          incomingVideoCall:{...from,roomId, callType}
        })
      })

      socket.current.on("voice-call-rejected",()=>{
        dispatch({
          type:reducerCases.END_CALL,
        })
      })

      socket.current.on("video-call-rejected",()=>{
        dispatch({
          type:reducerCases.END_CALL,
        })
      })

      socket.current.on("online-users",({onlineUsers})=>{
        dispatch({
          type:reducerCases.SET_ONLINE_USERS,
           onlineUsers
        })
      })
      // socket.on("accept-incoming-call",({id})=>{
      //   const sendUserSocket
      // })
      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {
      console.log("Fetching messages for", userInfo?.id, currentChatUser?.id);
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`
      );
      dispatch({
        type: reducerCases.SET_MESSAGES,
        messages,
      });
    };
    if (userInfo?.id && currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser, userInfo]);

  return (
    <>
    {
      incomingVideoCall && <IncomingVideoCall/>
    }
    {
      incomingVoiceCall && <IncomingCall/>
    }
    {
      videocall && (<div className="h-screen w-screen max-h-full overflow-hidden">
        <VideoCall/>
      </div>
    )}
    {
      voicecall && (<div className="h-screen w-screen max-h-full overflow-hidden">
        <VoiceCall/>
      </div>
    )}
    {
      !videocall && !voicecall &&
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />
      {currentChatUser ? (
        <div className={messagesSearch ? "grid grid-cols-2" : "grid-cols-2"}>
          <Chat />
          {messagesSearch && <SearchMessages />}
        </div>
      ) : (
        <Empty />
      )}
    </div>
    }
    
    </>
  );
}

export default Main;
