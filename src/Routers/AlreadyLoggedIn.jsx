import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import {
  FaCheckCircle,
  FaHome,
  FaTachometerAlt,
  FaUser,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import Loading from "../Components/Loading";

const AlreadyLoggedIn = ({ children }) => {
  const { user, userLoading } = useAuth();

  if (userLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  if (!user) return children;

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full border border-base-300 relative z-10">
        <div className="card-body p-3 sm:p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-linear-to-br from-success to-success/80 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <FaCheckCircle className="text-4xl text-base-100" />
              </div>
              {/* Sparkle Effects */}
              <HiSparkles className="absolute -top-2 -right-2 text-2xl text-secondary animate-pulse" />
              <HiSparkles
                className="absolute -bottom-2 -left-2 text-lg text-primary animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <HiLightningBolt
                className="absolute top-1/2 -right-6 text-xl text-accent animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
              Welcome Back,{" "}
              <span className="text-secondary">
                {user?.displayName || "Hero"}!
              </span>
            </h1>
            <div className="badge badge-secondary badge-lg mb-4">
              <FaHeart className="mr-2" />
              Already Logged In
            </div>
            <p className="text-lg text-base-content/70 max-w-md mx-auto leading-relaxed">
              You're already signed in to your BloodLine account. Ready to save
              lives today?
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-linear-to-r from-secondary/10 to-secondary/5 rounded-2xl p-6 mb-8 border border-secondary/20">
            <div className="flex items-center justify-center mb-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt={user?.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-base-content mb-2">
              {user?.displayName || "Blood Hero"}
            </h3>
            <p className="text-base-content/70 text-sm break-all">
              {user?.email}
            </p>
            <div className="flex items-center justify-center mt-3">
              <div className="badge badge-success badge-sm text-white">
                <div className="w-2 h-2 bg-green-900 rounded-full animate-ping mr-1"></div>
                Active
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Link
              to="/"
              className="btn btn-outline btn-secondary group hover:scale-105 transition-all duration-300"
            >
              <FaHome className="mr-2 group-hover:animate-bounce" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="btn btn-secondary group hover:scale-105 transition-all duration-300"
            >
              <FaTachometerAlt className="mr-2 group-hover:animate-spin" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/profile"
              className="btn btn-outline btn-secondary group hover:scale-105 transition-all duration-300"
            >
              <FaUser className="mr-2 group-hover:animate-pulse" />
              Profile
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-base-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-base-content mb-4 flex items-center justify-center">
              <HiLightningBolt className="mr-2 text-secondary" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/dashboard/newDonationRequest"
                className="btn btn-ghost btn-sm hover:btn-secondary transition-all duration-300 group"
              >
                <FaHeart className="mr-2 group-hover:animate-pulse" />
                New Request
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/donationRequests"
                className="btn btn-ghost btn-sm hover:btn-secondary transition-all duration-300 group"
              >
                <FaUser className="mr-2 group-hover:animate-bounce" />
                Find Donors
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t border-base-content/10">
            <p className="text-sm text-base-content/60">
              Thank you for being part of our life-saving community! 🩸❤️
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <HiSparkles
            className="text-3xl text-secondary animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <FaHeart className="text-2xl text-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;
