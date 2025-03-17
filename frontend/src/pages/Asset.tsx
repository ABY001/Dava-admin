import { Sidebar } from "../components";
import { HiOutlineChevronRight } from "react-icons/hi";
import VideoUpload from "../components/VideoUpload";

const Assets = () => {
    return (
        <div className="h-screen border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
            <Sidebar />
            <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
                <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
                    <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                                Assets Management
                            </h2>
                            <p className="dark:text-whiteSecondary text-blackPrimary text-base font-normal flex items-center">
                                <span>Dashboard</span>{" "}
                                <HiOutlineChevronRight className="text-lg" />{" "}
                                <span>Assets management</span>
                            </p>
                        </div>
                    </div>
                    <div className="px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center mt-5 max-sm:flex-col max-sm:gap-2">
                        <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-5">
                            Update your Story Image here
                        </h3>
                        <VideoUpload />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Assets