import { HiOutlineSave } from "react-icons/hi";
import { InputWithLabel, Sidebar, SimpleInput, WhiteButton } from "../components";
import { useEffect, useState } from "react";

const Profile = () => {
  const user: any = localStorage.getItem("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: "", confirmPassword: "" });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!id) return
  //   await dispatch(updateUser({ id, ...formData }));
  //   dispatch(fetchUsers())
  //   navigate("/users");
  // };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Your Profile
              </h2>
            </div>
            {/* Profile update button or any other action */}
            <WhiteButton
              link="/profile"
              textSize="lg"
              width="48"
              py="2"
              text="Update profile"
            >
              <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
            </WhiteButton>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8">
            {/* Profile details section */}
            <div className="flex flex-col gap-4">
              {/* Example: Displaying user information */}
              <div className="flex justify-start items-center max-sm:flex-col max-sm:gap-10">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="dark:text-whiteSecondary text-blackPrimary text-xl">
                      {user?.name}
                    </p>
                    <p className="dark:text-whiteSecondary text-blackPrimary">
                      Admin
                    </p>
                  </div>
                </div>
              </div>
              {/* Additional sections like password change, email update, etc. */}
              <div className="flex flex-col gap-3 mt-5">
                <InputWithLabel label="Your username">
                  <SimpleInput
                    type="text"
                    name="name"
                    placeholder="Your username"
                    value={formData.name}                    
                    onChange={handleChange}
                  />
                </InputWithLabel>
                <InputWithLabel label="Your email">
                  <SimpleInput
                    type="text"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}                   
                    onChange={handleChange}
                  />
                </InputWithLabel>
                <InputWithLabel label="New password">
                  <SimpleInput
                    type="password"
                    name="password"
                    placeholder="Enter your new password..."
                    value={formData.password}
                    onChange={handleChange}
                  />
                </InputWithLabel>
                <InputWithLabel label="Confirm new password">
                  <SimpleInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your new password..."
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </InputWithLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
