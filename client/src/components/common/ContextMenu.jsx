// import React, { useRef, useEffect } from "react";

// function ContextMenu({ options, coordinates, ContextMenu, setContextMenu }) {
//   const contextMenuRef = useRef(null);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       const clickedElement = event.target;

//       // Only ignore if it's the avatar opener
//       if (clickedElement.id !== "context-opener") {
//         if (
//           contextMenuRef.current &&
//           !contextMenuRef.current.contains(clickedElement)
//         ) {
//           setContextMenu(false);
//         }
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [setContextMenu]);

//   const handleClick = (e, callback) => {
//     e.stopPropagation();
//     setContextMenu(false);
//     callback();
//   };

//   // 🛡️ Don't render if coordinates aren't provided or menu is closed
//   if (!coordinates || !ContextMenu) return null;

//   return (
//     <div
//       ref={contextMenuRef}
//       className="bg-dropdown-background fixed py-2 z-[100] rounded-lg shadow-lg w-[200px]"
//       style={{
//         top: coordinates.y,
//         left: coordinates.x,
//       }}
//     >
//       <ul className="space-y-1">
//   {options.map(({ name, callback }) => (
//     <li
//       key={name}
//       onClick={(e) => handleClick(e, callback)}
//       className="text-white hover:bg-gray-700 px-5 py-2 cursor-pointer rounded-md transition-all duration-150 ease-in-out"
//     >
//       {name}
//     </li>
//   ))}
// </ul>


//     </div>
//   );
// }

// export default ContextMenu;
import React, { useRef, useEffect, useState } from "react";

function ContextMenu({ options, coordinates, ContextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);
  const [position, setPosition] = useState(coordinates);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedElement = event.target;
      if (clickedElement.id !== "context-opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(clickedElement)
        ) {
          setContextMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setContextMenu]);

  useEffect(() => {
    // Adjust position if it overflows right or left
    if (!contextMenuRef.current) return;

    const menu = contextMenuRef.current;
    const menuRect = menu.getBoundingClientRect();
    const margin = 10;

    let newX = coordinates.x;
    let newY = coordinates.y;

    // If menu overflows right viewport edge, shift left
    if (menuRect.right > window.innerWidth - margin) {
      newX = window.innerWidth - menuRect.width - margin;
    }
    // If menu overflows left viewport edge, shift right
    if (menuRect.left < margin) {
      newX = margin;
    }
    // Optionally, if bottom overflows, can shift vertically as well
    if (menuRect.bottom > window.innerHeight - margin) {
      // e.g. shift menu up by its height + avatar height or so
      newY = Math.max(margin, coordinates.y - menuRect.height - 40); 
    }

    if (newX !== coordinates.x || newY !== coordinates.y) {
      setPosition({ x: newX, y: newY });
    } else {
      setPosition(coordinates);
    }
  }, [coordinates]);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  if (!coordinates || !ContextMenu) return null;

  return (
    <div
      ref={contextMenuRef}
      className="bg-dropdown-background fixed py-2 z-[100] rounded-lg shadow-lg w-[200px]"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <ul className="space-y-1">
        {options.map(({ name, callback }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callback)}
            className="text-white hover:bg-gray-700 px-5 py-2 cursor-pointer rounded-md transition-all duration-150 ease-in-out"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
