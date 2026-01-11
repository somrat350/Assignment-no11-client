import { HiLightningBolt } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const GoogleSignInButton = () => {
  const { setUserLoading, createUG } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    createUG()
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Login successful.");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="btn btn-outline w-full group hover:scale-105 transition-all duration-300 relative overflow-hidden"
    >
      {/* Content */}
      <div className="flex items-center justify-center relative z-10">
        <div className="relative">
          <svg
            className="text-xl mr-3 text-red-500 group-hover:animate-spin"
            style={{ animationDuration: "2s" }}
            aria-label="Google logo"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="transparent"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          {/* Lightning effect */}
          <HiLightningBolt className="absolute -top-1 -right-1 text-xs text-yellow-500 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" />
        </div>
        <span className="font-semibold">Continue with Google</span>
      </div>
    </button>
  );
};

export default GoogleSignInButton;
