// import React from "react";
// import { useStateProvider } from "@/context/StateContext";

// function ChatContainer() {
//   const[{messages, currentChatUser, userInfo}] = useStateProvider();
//   return <div className="h-[80vh] w-full relative flex flex-grow overflow-auto custom-scrollbar">
//     <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0">
//       <div className="flex w-full">
//         <div className="flex flex-col justify-end w-full gap-1 overflow-auto ">
//           {messages.map((message, index) => (
//   <div key={message.id} className={`${message.senderId===currentChatUser?.id ? "justify-start": "justify-end"} `}>
//     {message.type==="text" && (
//       <div className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${message.senderId === currentChatUser.id?"bg-incoming-background": "bg-outgoing-background"}`}>
//         <span className="break-all">{message.message}</span>
//       </div>
//     )}
//   </div>
// ))}
//         </div>
//       </div>
//     </div>

//   </div>;
// }

// export default ChatContainer;

// import React from "react";
// import { useStateProvider } from "@/context/StateContext";
// import { calculateTime } from "@/utils/CalculateTime.js";

// function ChatContainer() {
//   const [{ messages, currentChatUser, userInfo }] = useStateProvider();

//   return (
//     <div className="h-[80vh] w-full relative flex flex-grow overflow-auto custom-scrollbar px-4 py-2">
//       <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0" />

//       <div className="flex flex-col justify-end w-full gap-2 z-10">
//         {messages.map((message, index) => {
//           const isSentByMe = message.senderId === userInfo?.id;
//           return (
//             <div
//               key={message.id || index}
//               className={`flex w-full ${isSentByMe ? "justify-end" : "justify-start"}`}
//             >
//               {message.type === "text" && (
//                 <div
//                   className={`text-sm px-3 py-2 rounded-xl shadow-md max-w-[75%] break-words ${
//                     isSentByMe
//                       ? "bg-[#dcf8c6] text-black"  // Outgoing message: WhatsApp green
//                       : "bg-white text-black"      // Incoming message: WhatsApp white
//                   }`}
//                 >
//                   <span className="break-all">{message.message}</span>
//                   <div className="flex gap-1 items-end">
//                     <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
//                       {
//                         calculateTime(message.createdAt)
//                       }
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default ChatContainer;

import React from "react";
import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime.js";
import MessageStatus from "../common/MessageStatus.jsx";
import ImageMessage from "./ImageMessage.jsx";
import VoiceCall from "../Call/VoiceCall.jsx";
import dynamic from "next/dynamic.js";
const VoiceMessage = dynamic(()=>import ("./VoiceMessage.jsx"),{
  ssr:false
})

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();

  return (
    <div className="h-[80vh] w-full relative flex flex-grow overflow-auto custom-scrollbar px-4 py-2">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0" />

      <div className="flex flex-col justify-end w-full gap-2 z-10">
        {messages.map((message, index) => {
          const isSentByMe = message.senderId === userInfo?.id;
          return (
            <div
              key={message.id || index}
              className={`flex w-full ${
                isSentByMe ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "text" && (
                <div
                  className={`relative text-sm px-3 py-2 rounded-xl shadow-md max-w-[75%] break-words ${
                    isSentByMe
                      ? "bg-[#dcf8c6] text-black"
                      : "bg-white text-black"
                  }`}
                >
                  {/* Message Text with right padding for time & ticks */}
                  <div className="pr-14 whitespace-pre-wrap break-words">
                    {message.message}
                  </div>

                  {/* Time & Tick positioned properly */}
                  <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[10px] text-gray-500">
                    <span>{calculateTime(message.createdAt)}</span>
                    {isSentByMe && (
                      <MessageStatus messageStatus={message.messageStatus} />
                    )}
                  </div>
                </div>
              )}
              {message.type === "image" && <ImageMessage message={message} />}
              {message.type === "audio" && <VoiceMessage message={message}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatContainer;
