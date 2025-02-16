// import { FaReact } from "react-icons/fa6";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
// import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../features/darkMode/darkModeSlice";
import logo from "/src/assets/Dava-logo.webp";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { logoutUser } from "../store/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { darkMode } = useAppSelector((state) => state.darkMode);

  // const goToProfile = () => {
  //   setIsOpen(!isOpen)
  //   navigate("/profile")
  // }

  return (
    <header className="dark:bg-blackPrimary bg-whiteSecondary relative">
      <div className="flex justify-between items-center px-9 py-5 max-xl:gap-y-7 max-[400px]:px-4">
        <HiOutlineMenu
          className="text-2xl dark:text-whiteSecondary text-blackPrimary absolute bottom-7 left-5 xl:hidden max-sm:static max-sm:order-1 cursor-pointer"
          onClick={() => dispatch(setSidebar())}
        />
        <Link to="/">
          {/* <FaReact className="text-4xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer" /> */}

          <img src={logo} className="w-[5rem] cursor-pointer" />
        </Link>
        {/* <SearchInput /> */}
        <div className="flex gap-4 items-center max-xl:justify-center">
          {/* <span className="dark:text-whiteSecondary text-blackPrimary">EN</span> */}
          {darkMode ? (
            <HiOutlineSun
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          ) : (
            <HiOutlineMoon
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          )}

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <p className="dark:text-whiteSecondary text-blackPrimary text-base max-xl:text-sm">
                    Abiola Fadipe
                  </p>
                  <p className="dark:text-whiteSecondary text-blackPrimary text-sm max-xl:text-xs">
                    Admin
                  </p>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  {/* <li>
                    <button
                      onClick={() => goToProfile()}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <BiUser className="w-4 h-4 mr-2" /> Profile
                    </button>
                  </li> */}
                  <li>
                    <button
                      onClick={() => dispatch(logoutUser())}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <BiLogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
