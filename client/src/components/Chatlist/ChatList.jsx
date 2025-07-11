import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import { useEffect, useState } from "react";
import ContactsList from "./ContactsList";

function ChatList() {
  const[{contactsPage}]=useStateProvider();
  const [pageType, setpageType] = useState("default")

  useEffect(()=>{
    if(contactsPage){
      setpageType("all-contacts")
    }else{
      setpageType("default")
    }
  },[contactsPage])
  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
  {pageType === "default" && (
    <>
      <ChatListHeader />
      <SearchBar />
      <List />
    </>
  )}
  {
    pageType === "all-contacts" && <ContactsList/>
  }
</div>

  )
}

export default ChatList;
