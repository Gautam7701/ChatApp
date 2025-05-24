import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs"; 
import { reducerCases } from "@/context/constants";

function ChatListHeader() {
  const [{ userInfo },dispatch] = useStateProvider();

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
        />
      </div>
    </div>
  );
}

export default ChatListHeader;
