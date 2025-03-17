import { HiOutlineCreditCard, HiBriefcase } from "react-icons/hi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { HiOutlineX } from "react-icons/hi";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { HiOutlineUser } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  // Determine the sidebar class based on isSidebarOpen
  const sidebarClass: string = isSidebarOpen
    ? "sidebar-open"
    : "sidebar-closed";

  const navActiveClass: string =
    "block dark:bg-whiteSecondary flex items-center self-stretch gap-4 py-4 px-6 cursor-pointer max-xl:py-3 dark:text-blackPrimary bg-white text-blackPrimary";
  const navInactiveClass: string =
    "block flex items-center self-stretch gap-4 py-4 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary";

  return (
    <div className="relative">
      <div
        className={`w-72 h-[100vh] dark:bg-blackPrimary bg-whiteSecondary pt-6 xl:sticky xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 ${sidebarClass}`}
      >
        <HiOutlineX
          className="dark:text-whiteSecondary text-blackPrimary text-2xl ml-auto mb-2 mr-2 cursor-pointer xl:py-3"
          onClick={() => dispatch(setSidebar())}
        />
        <div>

          <NavLink
            to="/products"
            onClick={() => dispatch(setSidebar())}
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineDevicePhoneMobile className="text-xl" />
            <span className="text-lg">Products</span>
          </NavLink>
          <NavLink
            to="/users"
            onClick={() => dispatch(setSidebar())}
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineUser className="text-xl" />
            <span className="text-lg">Users</span>
          </NavLink>
          <NavLink
            to="/orders"
            onClick={() => dispatch(setSidebar())}
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineCreditCard className="text-xl" />
            <span className="text-lg">Orders</span>
          </NavLink>
          <NavLink
            to="/asset-management"
            onClick={() => dispatch(setSidebar())}
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiBriefcase className="text-xl" />
            <span className="text-lg">Assets</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
