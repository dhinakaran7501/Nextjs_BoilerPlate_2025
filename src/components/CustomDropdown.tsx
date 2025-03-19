import React, { useState, useRef, useEffect } from "react";
import Icon from "@/utils/icons";
import { SearchDropdownBoxProps } from "@/types/componentsTypes";

export default function SearchDropdownBox<T extends Record<string, any>>({
  options,
  fieldName = "name",
  onSelect,
  selectedItemList,
  isMulti = false,
}: SearchDropdownBoxProps<T>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const handleSelect = (itemId: string) => {
    let updatedSelection: string[];

    const selectedItem = options.find((opt) => opt.id === itemId);
    if (!selectedItem) return;

    const selectedValue = String(selectedItem[fieldName]);

    if (isMulti) {
      updatedSelection = selectedItemList.includes(selectedValue)
        ? selectedItemList.filter((val) => val !== selectedValue)
        : [...selectedItemList, selectedValue];
    } else {
      updatedSelection = [selectedValue];
      setDropdownOpen(false);
    }

    onSelect(updatedSelection);
  };

  const handleRemoveSelection = (value: string) => {
    onSelect(selectedItemList.filter((item) => item !== value));
  };

  const availableOptions = options.filter(
    (item) => !selectedItemList.includes(String(item[fieldName])),
  );

  return (
    <div className="relative w-72" ref={dropdownRef}>
      <button
        className="flex items-center text-sm border w-full text-start border-[var(--primary-border-color)] px-3 py-2 rounded-md cursor-pointer justify-between"
        onClick={toggleDropdown}
      >
        <div className="flex-1">
          {isMulti ? (
            selectedItemList.length === 0 ? (
              <span className="text-gray-400">Select an option...</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                {selectedItemList.map((value) => (
                  <div
                    key={value}
                    className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                  >
                    {value}
                    <Icon
                      name="close"
                      className="ml-2 text-red-500 cursor-pointer"
                      size={12}
                      onPressClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSelection(value);
                      }}
                    />
                  </div>
                ))}
              </div>
            )
          ) : selectedItemList.length === 0 ? (
            <span className="text-gray-400">Select an option...</span>
          ) : (
            <span className="text-[var(--primary-text-color)]">
              {selectedItemList[0]}
            </span>
          )}
        </div>

        {selectedItemList.length > 0 && (
          <Icon
            name="close"
            className="text-gray-500 cursor-pointer mx-2"
            size={14}
            onPressClick={(e) => {
              e.stopPropagation();
              onSelect([]);
            }}
          />
        )}

        <Icon name="downArrow" className="text-gray-500 cursor-pointer" />
      </button>

      {/* Dropdown List */}
      {dropdownOpen && (
        <div className="absolute w-full mt-2 text-sm text-[var(--primary-text-color)] bg-[var(--primary-background)] border border-[var(--primary-border-color)] shadow-lg rounded-md z-10 overflow-hidden">
          <ul className="max-h-40 overflow-y-auto">
            {availableOptions.length > 0 ? (
              availableOptions.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-400"
                  onClick={() => handleSelect(item.id)}
                >
                  {String(item[fieldName])}
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-400 text-center">
                No Data Found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// import { SearchDropdownBoxProps } from "@/types/componentsTypes";
// import Icon from "@/utils/icons";
// import React, { useState, useRef, useEffect } from "react";

// export default function SearchDropdownBox({
//   options,
//   fieldName = "name",
//   onSelect,
//   selectedItemList,
//   isMulti = false,
// }: SearchDropdownBoxProps) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setDropdownOpen((prev) => !prev);

//   useEffect(() => {
//     const closeDropdown = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", closeDropdown);
//     return () => document.removeEventListener("mousedown", closeDropdown);
//   }, []);

//   const handleSelect = (itemId: string) => {
//     let updatedSelection: string[];

//     if (isMulti) {
//       updatedSelection = [...selectedItemList];
//       if (updatedSelection.includes(itemId)) {
//         updatedSelection = updatedSelection.filter((id) => id !== itemId);
//       } else {
//         updatedSelection.push(itemId);
//       }
//     } else {
//       updatedSelection = [itemId];
//       setDropdownOpen(false);
//     }

//     onSelect(updatedSelection);
//   };

//   const handleRemoveSelection = () => {
//     onSelect([]);
//   };

//   const availableOptions = options.filter(
//     (item) => !selectedItemList.includes(item.id)
//   );

//   return (
//     <div className="relative w-72" ref={dropdownRef}>
//       <button
//         className="flex items-center text-sm border w-full text-start border-[var(--primary-border-color)] px-3 py-2 rounded-md cursor-pointer justify-between"
//         onClick={toggleDropdown}
//       >
//         <div className="flex-1">
//           {isMulti ? (
//             selectedItemList.length === 0 ? (
//               <span className="text-gray-400">Select an option...</span>
//             ) : (
//               <div className="flex flex-wrap gap-1">
//                 {selectedItemList.map((id) => {
//                   const item = options.find((opt) => opt.id === id);
//                     console.log(item)
//                   return (
//                     item && (
//                       <div
//                         key={id}
//                         className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
//                       >
//                         {item[fieldName]}
//                         <Icon
//                           name="close"
//                           className="ml-2 text-red-500 cursor-pointer"
//                           size={12}
//                           onPressClick={(e) => {
//                             e.stopPropagation();
//                             handleSelect(item[fieldName]);
//                           }}
//                         />
//                       </div>
//                     )
//                   );
//                 })}
//               </div>
//             )
//           ) : selectedItemList.length === 0 ? (
//             <span className="text-gray-400">Select an option...</span>
//           ) : (
//             <span className="text-[var(--primary-text-color)]">
//               {
//                 options.find((opt) => opt.name === selectedItemList[0])?.[
//                   fieldName
//                 ]
//               }
//             </span>
//           )}
//         </div>

//         {selectedItemList.length > 0 && (
//           <Icon
//             name="close"
//             className="text-gray-500 cursor-pointer mx-2"
//             size={14}
//             onPressClick={(e) => {
//               e.stopPropagation();
//               handleRemoveSelection();
//             }}
//           />
//         )}

//         <Icon name="downArrow" className="text-gray-500 cursor-pointer" />
//       </button>

//       {dropdownOpen && (
//         <div className="absolute w-full mt-2 text-sm text-[var(--primary-text-color)] bg-[var(--primary-background)] border border-[var(--primary-border-color)] shadow-lg rounded-md z-10 overflow-hidden">
//           <ul className="max-h-40 overflow-y-auto">
//             {availableOptions.length > 0 ? (
//               availableOptions.map((item) => (
//                 <li
//                   key={item.id}
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-400"
//                   onClick={() => handleSelect(item[fieldName])}
//                 >
//                   {item[fieldName]}
//                 </li>
//               ))
//             ) : (
//               <li className="p-2 text-sm text-gray-400 text-center">
//                 No Data Found
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
