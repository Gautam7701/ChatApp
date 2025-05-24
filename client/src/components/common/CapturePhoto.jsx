// import React from "react";
// import { IoClose } from "react-icons/io5";
// import { useRef } from "react";
// import { useEffect } from "react";

// function CapturePhoto({ setProfileImage, hide }) {
//   const videoRef = useRef(null);


//   useEffect(() => {
//     let stream;
//     const startCamera = async () => {
//       try {
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     }
//     startCamera();
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [])
  
//   const capturePhoto = () => {
//     const canvas= document.createElement("canvas");
//      canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 300,150);
//      setProfileImage(canvas.toDataURL("image/jpeg"));
//       hide(false);
//   }
//   return (
//     <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center ">
//       <div className="flex flex-col gap-4 w-full ">
//         <div onClick={() => hide(false)} className="pt-2 pr-2 cursor-pointer flex items-end justify-end">
//           <IoClose className="h-6 w-6 cursor-pointer flex justify-center items-center " />
//         </div>
//         <div className="flex justify-center">
//           <video
//             className="h-4/6 w-2/6 rounded-lg"
//             autoPlay
//             ref={videoRef}
//             playsInline
//             muted
//             id="video"
//           ></video>
//         </div>
//         <button className="h-14 w-14 bg-white rounded-full cursor-pointer border-8 border-teal-light hover:border-teal-dark transition-all duration-200 flex items-center justify-center" onclick={capturePhoto}>

//         </button>
//       </div>

//     </div>
//   )
// }

// export default CapturePhoto;

import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

function CapturePhoto({ setProfileImage, hide }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setProfileImage(canvas.toDataURL("image/jpeg"));
    hide(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative bg-gray-900 p-6 rounded-xl flex flex-col items-center justify-center gap-6 shadow-lg w-[90vw] max-w-md">
        
        {/* Close Button */}
        <div
          onClick={() => hide(false)}
          className="absolute top-2 right-2 text-white cursor-pointer font-bold "
        >
          <IoClose className="h-6 w-6" />
        </div>

        {/* Camera Preview */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="rounded-lg w-full max-h-[300px] object-cover border-4 border-white"
        />

        {/* Capture Button */}
        <button
          onClick={capturePhoto}
          className="h-16 w-16 bg-white rounded-full border-8 border-teal-400 hover:border-teal-600 transition duration-300 flex items-center justify-center shadow-md"
        >
          <div className="h-4 w-4 bg-teal-500 rounded-full"></div>
        </button>
      </div>
    </div>
  );
}

export default CapturePhoto;
