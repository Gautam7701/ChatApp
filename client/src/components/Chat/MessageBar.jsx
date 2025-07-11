import { useStateProvider } from "@/context/StateContext";
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import React, { useEffect, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";
import PhotoPicker from "../common/PhotoPicker";

import { FaMicrophone } from "react-icons/fa";
import dynamic from "next/dynamic"

const CaptureAudio = dynamic(()=> import ("../common/CaptureAudio"),{
  ssr:false
})

function MessageBar() {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo.id,
          to: currentChatUser.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...response.data.message,
          },
          fromSelf: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const hanbdleOutsideClick = (event) => {
      if (event.target.id !== "emoji-icon") {
        if (
          emojiPickerRef.current && 
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", hanbdleOutsideClick);
    return () => {
      document.removeEventListener("click", hanbdleOutsideClick);
    };
  });

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
    // setMessage((prevMessage) => prevMessage + emoji.native);
  };
  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => (prevMessage += emoji.emoji));
    // setShowEmojiPicker(false); // Close the emoji picker after selecting an emoji
  };
  const sendMessage = async () => {
    // alert("message sent");
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: {
          ...data.message,
        },
        fromSelf: true,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (grabPhoto) {
      const photoPicker = document.getElementById("photo-picker");
      photoPicker?.click();

      document.body.onfocus = () => {
        setTimeout(() => setGrabPhoto(false), 1000);
      };
    }
  }, [grabPhoto]);
  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      {
        !showAudioRecorder && (
      
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
            id="emoji-icon"
            onClick={handleEmojiModal}
          />
          {showEmojiPicker && (
            <div
              className="absolute bottom-24 left-16 z-40"
              ref={emojiPickerRef}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attachment"
            onClick={() => setGrabPhoto(true)}
          />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 w-full"
            onChange={(e) => setMessage(e.target.value || "")}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim() !== "") {
                sendMessage();
              }
            }}
          />
        </div>
        <div className="flex w-10 items-center justify-center">
          <button>
            {message.length ? (
              <MdSend
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Send Message"
                onClick={sendMessage}
              />
            ) : (
              <FaMicrophone
                className="text-panel-header-icon cursror-pointer text-xl"
                title="Record"
                onClick={()=>setShowAudioRecorder(true)}
              />
            )}
          </button>
        </div>
      </>
        )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      {showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} />}
    </div>
  );
}

export default MessageBar;
