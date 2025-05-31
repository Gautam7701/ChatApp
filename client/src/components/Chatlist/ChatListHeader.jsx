import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs"; 
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";
import { useRouter } from "next/router";
import { useState } from "react";

function ChatListHeader() {
  const [{ userInfo },dispatch] = useStateProvider();
  const router = useRouter()

  const [contextMenuCordinates, setContextMenuCordinates] = useState ({
      x: 0,
      y: 0,
    });
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  
    const showContextMenu = (e) => {
      e.preventDefault();
      setContextMenuCordinates({ x: e.pageX - 50, y: e.pageY + 20 });
      setIsContextMenuVisible(true);
    };
  
    const contextMenuOptions = [
      {
        name: "Logout",
        callback: async () => {
          setIsContextMenuVisible(false);
          router.push("/logout")
        },
      },
    ];

  const handleAllContactsPage =()=>{
    dispatch({type:reducerCases.SET_ALL_CONTACTS_PAGE})
  }
  console.log("User Profile Image URL:", userInfo?.profileImage);

  return (
    <div className="h-16 px-4 flex items-center justify-between bg-panel-header-background">
      {/* Avatar */}
      <div className="cursor-pointer">
        <Avatar type="sm" profileImage={userInfo?.profileImage} />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactsPage}
        />
        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Menu"
          onClick={(e)=> showContextMenu(e)}
          id="context-opener"
        />
         <ContextMenu
            options={contextMenuOptions}
            coordinates={contextMenuCordinates}
            ContextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
      </div>
    </div>
  );
}

export default ChatListHeader;
