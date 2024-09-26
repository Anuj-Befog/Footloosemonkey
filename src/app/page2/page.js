// // app/page2/page.js
// 'use client'; // Required for hooks
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation'; // Import to access search params

// export default function Page2() {
//   const searchParams = useSearchParams(); // Get search params
//   const selected = searchParams.get('selected'); // Get the 'selected' query parameter
//   const optionsJSON = searchParams.get('options'); // Get the options parameter
//   const options = optionsJSON ? JSON.parse(optionsJSON) : []; // Parse options

//   const [dropdownValue, setDropdownValue] = useState('');

//   // Load the dropdown value from localStorage or set to selected
//   useEffect(() => {
//     const savedValue = localStorage.getItem('dropdownValue');
//     if (savedValue) {
//       setDropdownValue(savedValue);
//     } else if (selected) {
//       setDropdownValue(selected);
//     }
//   }, [selected]);

//   const handleDropdownChange = (e) => {
//     const value = e.target.value;
//     setDropdownValue(value);
//     localStorage.setItem('dropdownValue', value); // Save to localStorage
//   };

//   return (
//     <div>
//       <h1>Pre-filled Dropdown</h1>
//       <select value={dropdownValue} onChange={handleDropdownChange}>
//         <option value="">Select a category</option>
//         {options.map((option) => (
//           <option key={option} value={option} disabled={option !== selected}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
