import { Link } from "react-router";
import { FaRegEye, FaRegEyeSlash, FaStar } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { useForm } from "react-hook-form";
const Login = () => {
  const [passwordType, setPasswordType] = useState(true);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="sm:p-5 mt-10 w-full max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-5"
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="flex">
            Email{" "}
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="email"
              required
              {...register("email")}
              id="email"
              placeholder="Email"
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiMail className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="flex">
            Password
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type={passwordType ? "password" : "text"}
              required
              {...register("password")}
              id="password"
              placeholder="Password"
              className="input w-full pr-8"
            />
            <span
              onClick={() => setPasswordType(!passwordType)}
              className="absolute right-0 top-1 z-10 p-1 cursor-pointer"
            >
              {passwordType ? (
                <FaRegEyeSlash className="text-2xl" />
              ) : (
                <FaRegEye className="text-2xl" />
              )}
            </span>
          </div>
        </div>

        {/* Login */}
        <button className="col-span-full btn btn-secondary text-lg">
          Login
        </button>

        {/* Do not have */}
        <div className="flex flex-col gap-2 text-right col-span-full">
          <p>
            Don't have an account?
            <Link to="/auth/register" className="text-secondary font-bold">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
