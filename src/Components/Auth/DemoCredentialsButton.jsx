import { FaUserSecret, FaLock, FaEye } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const DemoCredentialsButton = () => {
  const { loginUEP, setUserLoading } = useAuth();
  const data = {
    email: "demo@bloodline.com",
    password: "Demo123",
  };
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleDemoClick = () => {
    loginUEP(data.email, data.password)
      .then(() => {
        navigate(from);
        toast.success("Login successful.");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          toast.error("Incorrect email or password!");
        }
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  return (
    <button
      type="button"
      onClick={handleDemoClick}
      className="btn btn-outline btn-info text-base-content w-full group hover:scale-105 transition-all duration-300 relative overflow-hidden"
    >
      {/* Content */}
      <div className="flex items-center justify-center relative z-10">
        <div className="relative">
          <FaUserSecret className="text-xl mr-3 group-hover:animate-bounce" />
          {/* Sparkle effect */}
          <HiSparkles className="absolute -top-1 -right-1 text-xs text-secondary opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
        </div>
        <span className="font-semibold">Try Demo Credentials</span>
        <FaEye className="ml-3 text-sm group-hover:animate-pulse" />
      </div>
    </button>
  );
};

export default DemoCredentialsButton;
