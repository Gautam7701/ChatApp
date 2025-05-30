import { useStateProvider } from "@/context/StateContext";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { reducerCases } from "@/context/constants";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([])
  const [{},dispatch] = useStateProvider();
  const[searchTerm,setSearchTerm] = useState("");
  const[searchContacts,setSearchContacts] = useState([]);

  useEffect(()=>{
    if(searchTerm.length){
      const filteredData={};
      Object.keys(allContacts).forEach((key)=>{
        filteredData[key]=allContacts[key].filter((obj)=>obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
      })
      setSearchContacts(filteredData);
    }
    else{
      setSearchContacts(allContacts);
    }

  },[searchTerm])

  useEffect(()=>{
    const getContacts = async ()=>{
      try{
        const {data:{users}}= await axios.get(GET_ALL_CONTACTS);
      setAllContacts(users);
      setSearchContacts(users)
      }
      catch(err){
        console.log(err);
      }
    };
    getContacts();
  },[])
  return (
  <div className="h-full flex flex-col">
    <div className="h-24 flex items-end px-3 py-4">
      <div className="flex items-center gap-12 text-white">
        <BiArrowBack
          className="cursor-pointer text-xl"
          onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })}
        />
        <span>New Chat</span>
      </div>
    </div>

    <div className="bg-search-input-container-background h-full flex flex-col overflow-auto custom-scrollbar">
      <div className="flex py-3 items-center gap-3 h-14">
        <div className="flex items-center bg-panel-header-background rounded-lg px-3 py-2 flex-grow gap-2 mx-4">
          <BiSearchAlt2 className="text-panel-header-icon text-xl cursor-pointer" />
          <input
            type="text"
            placeholder="Search Contacts"
            className="bg-transparent text-sm text-white w-full focus:outline-none"
            value ={searchTerm}
            onChange = {(e)=>setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {
        Object.entries(searchContacts).map(([initialLetter, userList]) =>{
          return (<div key = {Date.now()+initialLetter}>
            {userList.length && <div className="text-teal-light pl-10 py-5">{initialLetter}</div>}
            {
              userList.map(contact=>{
                return (<ChatLIstItem
                data={contact}
                isContactsPage ={true}
                key={contact.id}
                />)

              })
            }
          </div>)
        })
      }
    </div>
  </div>
);

}

export default ContactsList;
