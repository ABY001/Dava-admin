// import { FaReact } from "react-icons/fa6";
import {
  InputWithLabel,
  SimpleInput,
} from ".";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "/src/assets/Dava-logo.webp";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginUser } from "../store/authSlice";
import CustomButton from "./CustomButton";
import { toast } from "sonner";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Admin logged in successfully");
      navigate("/");
    } else {
      console.log('error', error);
    }
  };

  return (
    <div className="w-[500px] h-[450px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[350px]">
      <div className="flex flex-col items-center gap-10 w-full px-6">
        <img src={logo} className="w-[8rem]" />
        <div className="w-full flex flex-col gap-5">
          <InputWithLabel label="Email">
            <SimpleInput type="email" placeholder="Enter a email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputWithLabel>

          <InputWithLabel label="Password">
            <SimpleInput type="password" placeholder="Enter a password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputWithLabel>
        </div>
        {/* <p className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm">
          Forgot password?
        </p> */}
        <CustomButton
          textSize="lg"
          width="full"
          py="2"
          text="Login now"
          loading={loading}  
          onClick={(e) => handleLogin(e)}
        />
      </div>
    </div>
  )
}
export default LoginComponent