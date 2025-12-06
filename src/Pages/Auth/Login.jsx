import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-3xl font-extrabold">Welcome Back</h2>
      <p className="mt-2">Login with BloodLine</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-5"
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <div className="relative">
            <input
              type="email"
              required
              {...register("email")}
              id="email"
              placeholder="Email"
              className="input w-full text-lg pr-8"
            />
            <span className="absolute right-0 top-1/5 z-10 p-1">
              <CiMail className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={passwordType ? "password" : "text"}
              required
              {...register("password")}
              id="password"
              placeholder="Password"
              className="input w-full text-lg pr-8"
            />
            <span
              onClick={() => setPasswordType(!passwordType)}
              className="absolute right-0 top-1/5 z-10 p-1 cursor-pointer"
            >
              {passwordType ? (
                <FaEyeSlash className="text-2xl" />
              ) : (
                <FaEye className="text-2xl" />
              )}
            </span>
          </div>
        </div>

        {/* Login */}
        <div className="flex flex-col gap-2">
          <button className="btn btn-secondary text-lg">Login</button>
        </div>

        {/* Do not have */}
        <div className="flex flex-col gap-2">
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
