import { Outlet } from "react-router";
import authImg from "../assets/authImg.png";
import Logo from "../Components/Public/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="p-5">
        <Logo />
        <div className="max-w-md mx-auto mt-5">
          <Outlet />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src={authImg} />
      </div>
    </div>
  );
};

export default AuthLayout;
