import { HiOutlineSave } from "react-icons/hi";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
} from "../components";
import SelectInput from "../components/SelectInput";
import { roles } from "../utils/data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createUser } from "../store/userSlice";
import CustomButton from "../components/CustomButton";
import { toast } from "sonner";

const CreateUser = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    phonenumber: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("User created successfully");
        navigate("/users"); // Redirect after successful creation
      }
    });
  }

  return (
    <div className="h-screen border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new user
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <CustomButton
                textSize="lg"
                width="48"
                py="2"
                text="Publish user"
                loading={loading}
                onClick={(e) => handleSubmit(e)}
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </CustomButton>
            </div>
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-1 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                User information
              </h3>

              {error && <p className="text-red-500">{error}</p>}

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    name="name"
                    placeholder="Enter a name..."
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Email">
                  <SimpleInput
                    type="email"
                    name="email"
                    placeholder="Enter a email ..."
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Phone Number">
                  <SimpleInput
                    type="number"
                    name="phonenumber"
                    placeholder="Enter your phonenumber ..."
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Select role">
                  <SelectInput name="role" selectList={roles} onChange={handleChange} />
                </InputWithLabel>

                <InputWithLabel label="Password">
                  <SimpleInput
                    type="password"
                    name="password"
                    placeholder="Enter a password..."
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Confirm password">
                  <SimpleInput
                    type="password"
                    name="confirmpassword"
                    placeholder="Enter a confirm password..."
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
export default CreateUser;
