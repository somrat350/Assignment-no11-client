import { Outlet } from "react-router";
import authImg from "../assets/authImg.png";
import Logo from "../Components/Public/Logo";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen p-5 max-w-[1440px] mx-auto">
      <ToastContainer />
      <Logo />
      <div
        className="h-40 sm:h-64 bg-cover bg-center rounded-lg mt-5 flex justify-center items-center p-2"
        style={{
          backgroundImage: `url(${authImg})`,
        }}
      >
        <h2 className="text-white text-3xl sm:text-6xl font-bold text-center">
          Join As A Donor
        </h2>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
