import React from "react";
import {IoClose} from "react-icons/io5";

function PhotoLibrary({setProfileImage, hidePhotoLibrary}) {
  const images =[
    "/avatars/1.png",
    "/avatars/2.png", 
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",  
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];
  return (
  <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex items-center justify-center">
    <div className=" relative h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
      <div onClick={()=>hidePhotoLibrary(false)} className="pt-2 pr-2 cursor-pointer flex items-end justify-end">
        <IoClose className="h-6 w-6 cursor-pointer flex justify-center items-center "/>
      </div>
      <div className="grid grid-cols-3 gap-16 justify-center items-center p-20 w-full">
        {
          images.map((image, index) => (
            <div key={index} className="relative h-20 w-20 rounded-full overflow-hidden cursor-pointer group transition-all duration-200" 
            onClick={()=>{setProfileImage(images[index])
              hidePhotoLibrary(false)
            }}
            >
              <img
                src={image}
                alt="avatar"
                className="object-cover rounded-full h-24 w-24"
                onClick={() => {
                  setProfileImage(image);
                  hidePhotoLibrary(false);
                }}
              />
            </div>
          ))
        }
      </div>
    </div>
  </div>
  )
}

export default PhotoLibrary;
