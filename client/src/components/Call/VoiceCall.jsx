import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useStateProvider } from "@/context/StateContext";
const Container = dynamic(()=> import("./Container"),{
  ssr:false
})

function VoiceCall() {
  
    const [{voicecall,socket,userInfo}] =  useStateProvider();

    useEffect(()=>{
      if(voicecall.type === "out-going"){
        socket.current.emit("outgoing-voice-call",{
          to:voicecall.id,
          from:{
            id:userInfo.id,
            profilePicture:userInfo.profileImage,
            name:userInfo.name,
          },
          callType:voicecall.callType,
          roomId:voicecall.roomId,
        })
      }
    },[voicecall])
      return (
        <Container data={voicecall}/>
      )
}

export default VoiceCall;
