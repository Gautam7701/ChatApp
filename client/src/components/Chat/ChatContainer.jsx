import React from "react";
import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime.js";
import MessageStatus from "../common/MessageStatus.jsx";
import ImageMessage from "./ImageMessage.jsx";
import VoiceCall from "../Call/VoiceCall.jsx";
import dynamic from "next/dynamic.js";
import { useRef, useEffect} from "react";
const VoiceMessage = dynamic(()=>import ("./VoiceMessage.jsx"),{
  ssr:false
})

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, currentChatUser]);

  return (
    <div className="h-[80vh] w-full relative px-4 py-2">
      <div className="bg-chat-background absolute inset-0 opacity-5  z-0" />

      <div className="flex flex-col  gap-2 z-10 overflow-y-auto h-full custom-scrollbar pr-2 relative">
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
        <div ref={messagesEndRef}/>
      </div>
    </div>
  );
}

export default ChatContainer;
