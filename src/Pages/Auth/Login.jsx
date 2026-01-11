import { Link, useLocation, useNavigate } from "react-router";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaStar,
  FaEnvelope,
  FaLock,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import DemoCredentialsButton from "../../Components/Auth/DemoCredentialsButton";
import GoogleSignInButton from "../../Components/Auth/GoogleSignInButton";
import authImg from "../../assets/authImg.png";

const Login = () => {
  const { loginUEP, setUserLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordType, setPasswordType] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    setIsSubmitting(true);
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
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center p-4 relative overflow-hidden">
      <title>Login | BloodLine</title>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-success rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="w-full max-w-xl lg:max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Image & Welcome */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <div className="relative mb-8">
            <img
              src={authImg}
              alt="Blood Donation"
              className="w-full max-w-md rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-linear-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <FaHeart className="text-2xl text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-linear-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <HiSparkles className="text-xl text-white" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-base-content mb-4">
              Welcome Back, <span className="text-secondary">Hero!</span>
            </h1>
            <p className="text-lg text-base-content/70 mb-6 leading-relaxed">
              Sign in to continue your life-saving journey with BloodLine. Every
              login brings you closer to making a difference.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-base-content/60">
              <div className="flex items-center">
                <FaShieldAlt className="mr-2 text-success" />
                Secure Login
              </div>
              <div className="flex items-center">
                <FaHeart className="mr-2 text-secondary" />
                Save Lives
              </div>
              <div className="flex items-center">
                <HiLightningBolt className="mr-2 text-warning" />
                Quick Access
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="card bg-base-100 shadow-2xl border border-base-300 relative overflow-hidden">
            {/* Card Header */}
            <div className="card-body p-8 sm:p-10">
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
                <h2 className="text-3xl font-bold text-base-content mb-2">
                  Welcome Back!
                </h2>
                <p className="text-base-content/70">
                  Sign in to your BloodLine account
                </p>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-linear-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaHeart className="text-2xl text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-base-content mb-2">
                  Sign In to BloodLine
                </h2>
                <p className="text-base-content/70">
                  Continue your heroic journey
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center">
                      <FaEnvelope className="mr-2 text-secondary" />
                      Email Address
                      <sup className="text-error ml-1">
                        <FaStar className="text-xs" />
                      </sup>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Enter your email address"
                      className={`input input-bordered w-full pl-12 transition-all duration-300 ${
                        errors.email ? "input-error" : "focus:input-secondary"
                      }`}
                    />
                    <FaEnvelope className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                  </div>
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center">
                      <FaLock className="mr-2 text-secondary" />
                      Password
                      <sup className="text-error ml-1">
                        <FaStar className="text-xs" />
                      </sup>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordType ? "password" : "text"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      placeholder="Enter your password"
                      className={`input input-bordered w-full pl-12 pr-12 transition-all duration-300 ${
                        errors.password
                          ? "input-error"
                          : "focus:input-secondary"
                      }`}
                    />
                    <FaLock className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                    <button
                      type="button"
                      onClick={() => setPasswordType(!passwordType)}
                      className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-secondary transition-colors duration-200 cursor-pointer p-1 text-base"
                    >
                      {passwordType ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-secondary hover:underline transition-all duration-200"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-secondary btn-lg w-full transition-all duration-300 transform hover:scale-105`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FaHeart className="mr-2" />
                      Sign In to Save Lives
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="divider divider-secondary text-base-content/80">
                  or continue with
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <GoogleSignInButton />
                  <DemoCredentialsButton />
                </div>

                {/* Register Link */}
                <div className="text-center pt-4 border-t border-base-content/10">
                  <p className="text-base-content/70">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-secondary font-semibold hover:underline transition-all duration-200"
                    >
                      Join the Heroes
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <HiSparkles
                className="text-2xl text-secondary animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <FaHeart className="text-xl text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
