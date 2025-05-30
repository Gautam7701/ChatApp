import React from "react";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import MessageStatus from "../common/MessageStatus";
import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime.js";

function ImageMessage({ message }) {
  const [{ currentChatUser, userInfo }] = useStateProvider();
  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId === currentChatUser.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      } flex items-center gap-2 max-w-[45%]`}
    >
      <div className="relative">
        <Image src={`${HOST}/${message.message}`} 
        className="rounded-lg"
        alt="Image Message"
        height={300}
        width={300}
        />
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          <span className="text-bubble-meta-text text-[11px] min-w-fit">
            {calculateTime(message.createdAt)}
          </span>
          <span className="text-bubble-meta-text text-[11px] pt-1 min-w-fit">
{
              message.senderId === userInfo.id && (
                <MessageStatus messageStatu= {message.messageStatus} />
              )
                
}
          </span>


        </div>
      </div>
    </div>
  );
}

export default ImageMessage;
