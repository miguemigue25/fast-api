import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '/Users/jacobdelott/projects/flashcard-maker/src/assets/flashcardvector.png'


const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-500 flex justify-between items-center p-8">
      <div className="flex items-center">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-12 h-12 mr-2" /> 
        <NavLink to="/">
          <h1 className="ml-auto text-white mr-2 font-bold text-3xl pt-2 hover:text-orange1">Flashcard Ai</h1>
        </NavLink>
      </div>
      <div>
      </div>
    <div className="pr-2 justify-between items-center">
      <div className="flex">
        {/* <NavLink to="/" className="text-white font-bold text-lg" activeClassName="text-yellow-500">
          Home
        </NavLink> */}
        <NavLink to="/flashcardmaker" className="text-white font-bold text-lg ml-4 hover:text-orange-500">
          <button className="bg-gray-800 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none hover:white hover:bg-gray-100 hover:text-orange1">
          Generate
          </button>
        </NavLink>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;






















// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
// import flashCardMain from "@/components/ui/flashcardmain";




// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
  
// } from "@/components/ui/navigation-menu"



// interface NavbarProps {
//   // Define any props your Navbar component might receive
// }

// const Navbar: React.FC<NavbarProps> = () => {
//   const [toggleMenu, setToggleMenu] = useState<boolean>(false);
//   const location = useLocation();

//   const isFlashCardMakerRoute = location.pathname === '/flashcardmaker';

//   return (
//     <nav className='relative container mx-auto p-6'>
//       {/* Flex Container */}
//       <div className='flex items-center justify-between'>
//         {/* Logo */}
//         <div className='pt-4'>
//           {/* Adjust the font size here */}
//           <Link to="/">
//             <h1 className='fixed top-0 left-0 w-full p-4 text-xl p-8'> </h1>
//           </Link>
//           <Link to="/">
//             <h1 className='fixed top-0 left-0 w-full p-4 text-xl p-8'> FlashCard Maker</h1>
//           </Link>
//         </div>
//         {/* Menu Items */}
        
          
          
//           {isFlashCardMakerRoute && (
//           <div className='flex m-80'>
            
//           <NavigationMenu>
//             <NavigationMenuList>
//               <NavigationMenuItem>
             
//                   <NavigationMenuLink  className={`text-gray-800 ${navigationMenuTriggerStyle()}`}>
//                   <div className='flex'>
//                     <div className=''>
//                       {flashCardMain()}
//                     </div>
//                   </div>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//       )}
        
//         {/* Button */}
        

//         {/* Hamburger Icon */}
//         <button
//           className={
//             toggleMenu
//               ? 'open block hamburger md:hidden focus:outline-none'
//               : 'block hamburger md:hidden focus:outline-none'
//           }
//           onClick={() => setToggleMenu(!toggleMenu)}
//         >
//           <span className='hamburger-top'></span>
//           <span className='hamburger-middle'></span>
//           <span className='hamburger-bottom'></span>
//         </button>
    

//       {/* Mobile Menu */}
//       <div className='md:hidden'>
//         <div
//           className={
//             toggleMenu
//               ? 'absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white w-full left-0 right-0 drop-shadow-md'
//               : 'absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white w-full left-0 right-0 drop-shadow-md'
//           }
//         >
          
//         </div>
//       </div>
//     </div>
//     </nav>
//   );
// };

// export default Navbar;
