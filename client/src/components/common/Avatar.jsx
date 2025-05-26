import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, profileImage, setProfileImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({ x: 0, y: 0 });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);
  const avatarRef = useRef(null);

  const showContextMenu = (e) => {
    e.preventDefault();
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setContextMenuCoordinates({
        x: rect.left + rect.width / 2 - 75,
        y: rect.bottom + window.scrollY + 8,
      });
      setIsContextMenuVisible((prev) => !prev);
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

  const contextMenuOptions = [
    { name: "Take Photo", callback: () => setShowCapturePhoto(true) },
    { name: "Choose from library", callback: () => setShowPhotoLibrary(true) },
    { name: "Upload photo", callback: () => setGrabPhoto(true) },
    { name: "Remove Photo", callback: () => setProfileImage("/default_avatar.png") },
  ];

  const photoPickerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {type === "xl" && (
        <div
          ref={avatarRef}
          className="relative h-40 w-40 rounded-full overflow-hidden cursor-pointer group transition-all duration-200"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={showContextMenu}
        >
          <Image
            src={profileImage}
            alt="avatar"
            fill
            className="object-cover rounded-full"
          />
          {hover && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
              <FaCamera className="text-2xl mb-1" />
              <span className="text-sm">Change your profile</span>
            </div>
          )}
        </div>
      )}

      {type === "sm" && (
        <div className="h-10 w-10 relative rounded-full overflow-hidden">
          <Image
            src={profileImage}
            alt="avatar"
            fill
            className="object-cover rounded-full"
          />
        </div>
      )}
      {type === "lg" && (
        <div className="h-14 w-14 relative rounded-full overflow-hidden">
          <Image
            src={profileImage}
            alt="avatar"
            fill
            className="object-cover rounded-full"
          />
        </div>
      )}

      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          ContextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
      {showCapturePhoto && (
        <CapturePhoto setProfileImage={setProfileImage} hide={setShowCapturePhoto} />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary setProfileImage={setProfileImage} hidePhotoLibrary={setShowPhotoLibrary} />
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </div>
  );
}

export default Avatar;
