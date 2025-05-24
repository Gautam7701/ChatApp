// import React from "react";
// import Image from "next/image";

// function Empty() {
//   return <div className="border-conversation-border border-1 w-full bg-panel-header-background flex flex-col items-center justify-center h-[100vh] border-b-4 border-b-icon-green">
//     <Image src="/whatsapp.gif" alt ="Wizapp" height={300} width={300}/>
//   </div>;
// }

// export default Empty;


import React from "react";
import Image from "next/image";

function Empty() {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #0b141a 0%, #202c33 50%, #233138 100%)",
      }}
    >
      <div
        className="p-8 rounded-3xl flex flex-col items-center shadow-lg max-w-md w-full"
        style={{
          backgroundColor: "rgba(30,42,49,0.8)", // photopicker-overlay-background
          boxShadow:
            "0 4px 15px rgba(0,168,132,0.3)", // subtle teal-green glow (icon-green)
        }}
      >
        <Image
          src="/whatsapp.gif"
          alt="WizzApp Welcome"
          height={250}
          width={250}
          className="rounded-full"
          priority
        />
        <h2
          className="mt-6 text-3xl font-extrabold tracking-wide text-primary-strong"
          style={{ color: "#e9edef" }} // primary-strong
        >
          Welcome to WizzApp!
        </h2>
        <p
          className="mt-3 text-center text-lg"
          style={{ color: "rgba(134,150,160,0.8)" }} // secondary, slightly transparent
        >
          Select a chat or start a new conversation to begin messaging.
        </p>
      </div>
    </div>
  );
}

export default Empty;
