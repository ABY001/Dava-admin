import { HiOutlineSave } from "react-icons/hi";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
} from "../components";
import SelectInput from "../components/SelectInput";
import { roles } from "../utils/data";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, updateUser } from "../store/userSlice";
import CustomButton from "../components/CustomButton";
import { toast } from "sonner";

const EditUser = () => {
  const { id, action } = useParams<{ id: string, action: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);
  const user = useAppSelector((state) => state.users.users.find((user) => user._id === id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: roles[0].value,
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, role: user.role });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return
    await dispatch(updateUser({ id, ...formData }));
    toast.success("User edited successfully");
    dispatch(fetchUsers())
    navigate("/users");
  };

  return (
    <div className="h-screen border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              {action && <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                {action.charAt(0).toUpperCase() + action.slice(1)} user
              </h2>}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {action === 'edit' && <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <CustomButton
                textSize="lg"
                width="48"
                py="2"
                text="Update user"
                loading={loading}
                onClick={(e) => handleSubmit(e)}
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </CustomButton>
            </div>}
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-1 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                User information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                {action !== 'edit' && <InputWithLabel label="Id">
                  <SimpleInput
                    type="text"
                    disabled={true}
                    value={user?._id}
                  />
                </InputWithLabel>}

                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    name="name"
                    disabled={action !== 'edit'}
                    placeholder="Enter a name..."
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Email">
                  <SimpleInput
                    type="text"
                    name="email"
                    disabled={action !== 'edit'}
                    placeholder="Enter a email ..."
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Select role">
                  <SelectInput
                    name="role"
                    disabled
                    selectList={roles}
                    value={formData.role}
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
export default EditUser;
