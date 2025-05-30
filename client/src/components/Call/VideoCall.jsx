import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
import React from "react";
import { useEffect } from "react";
const Container = dynamic(()=>import ("./Container"),{
  ssr:false
})

function VideoCall() {


  const [{videocall,socket,userInfo}] =  useStateProvider();

   useEffect(()=>{
        if(videocall.type === "out-going"){
         
          socket.current.emit("outgoing-video-call",{
            to:videocall.id,
            from:{
              id:userInfo.id,
              profilePicture:userInfo.profileImage,
              name:userInfo.name,
            },
            callType:videocall.callType,
            roomId:videocall.roomId,
          })
        }
      },[videocall])
  return (
    <Container data={videocall}/>
  )
}

export default VideoCall;
