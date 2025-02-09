import {
  InputWithLabel,
  SimpleInput,
  WhiteButton,
} from ".";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

const RegisterComponent = () => {
  const [email, setEmail] = useState("john@email.com");
  const [password, setPassword] = useState("pass1234567890");
  const [confirmPassword, setConfirmPassword] = useState("pass1234567890");
  return (
    <div className="w-[500px] h-[800px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
      <div className="flex flex-col items-center gap-10 w-full px-6">
        <img src="/src/assets/Dava-logo.webp" className="w-[8rem]"/>
        <div className="w-full flex flex-col gap-5">
          <InputWithLabel label="Email">
            <SimpleInput type="email" placeholder="Enter a email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputWithLabel>

          <InputWithLabel label="Password">
            <SimpleInput type="password" placeholder="Enter a password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputWithLabel>

          <InputWithLabel label="Confirm password">
            <SimpleInput type="password" placeholder="Confirm a password..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </InputWithLabel>
        </div>

        <WhiteButton
          link="/login"
          textSize="lg"
          width="full"
          py="2"
          text="Register now"
        ></WhiteButton>
        <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
          Have an account?{" "}
          <Link
            to="/login"
            className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
          >
            Login <FaArrowRight className="mt-[2px]" />
          </Link>
        </p>
      </div>
    </div>
  )
}
export default RegisterComponent