// import { reducerCases } from "@/context/constants";
// import { useStateProvider } from "@/context/StateContext";
// import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
// import React, { useEffect } from "react";
// import ChatLIstItem from "./ChatLIstItem";
// import axios from "axios"

// function List() {

//   const[{userInfo,userContacts},dispatch]=useStateProvider();

//   useEffect(()=>{
//       const getContacts = async()=>{
//         try {
//           const {data:{users,onlineUsers}}=await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`)
//           dispatch({type:reducerCases.SET_ONLINE_USERS,onlineUsers})
//           dispatch({type:reducerCases.SET_USER_CONTACTS,userContacts:users})
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getContacts();
//   },[userInfo])
//   return <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
//     {userContacts.map((contact)=> <ChatLIstItem data={contact} key = {contact.id}/>)}
//   </div>;
// }

// export default List;


import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import React, { useEffect } from "react";
import ChatLIstItem from "./ChatLIstItem";
import axios from "axios";

function List() {
  const [{ userInfo, userContacts, filteredContacts }, dispatch] = useStateProvider();

  useEffect(() => {
    if (!userInfo?.id) return; // Guard against undefined userInfo

    const getContacts = async () => {
      try {
        const { data: { users, onlineUsers } } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);
        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users });
      } catch (error) {
        console.log(error);
      }
    };
    if(userInfo?.id)
    getContacts();
  }, [userInfo, dispatch]);

  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
      {
        filteredContacts && filteredContacts.length>0?
        (filteredContacts.map((contact) => (
        <ChatLIstItem data={contact} key={contact.id} />))): (userContacts.map((contact) => (
        <ChatLIstItem data={contact} key={contact.id}/>)
        ))
      }
    
    </div>
  );
}

export default List;
