import { Link } from "react-router";
import { FaHeartbeat, FaUsers, FaHandHoldingHeart } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="hero-content text-center relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <div className="mb-8">
          <FaHeartbeat className="text-6xl text-secondary mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold text-base-content mb-6">
            Save Lives,
            <span className="text-secondary block">Give Blood</span>
          </h1>
          <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Connect blood donors with those in need. Every drop counts, every donation saves a life.
          </p>
        </div>

        {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-100/80 backdrop-blur-sm mb-12">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl" />
            </div>
            <div className="stat-title text-base-content/70">Active Donors</div>
            <div className="stat-value text-secondary">10,000+</div>
            <div className="stat-desc text-base-content/60">Ready to help</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaHandHoldingHeart className="text-3xl" />
            </div>
            <div className="stat-title text-base-content/70">Lives Saved</div>
            <div className="stat-value text-secondary">50,000+</div>
            <div className="stat-desc text-base-content/60">Through donations</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaHeartbeat className="text-3xl" />
            </div>
            <div className="stat-title text-base-content/70">Emergency Support</div>
            <div className="stat-value text-secondary">24/7</div>
            <div className="stat-desc text-base-content/60">Always available</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="btn btn-secondary btn-lg text-base-100 px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Become a Donor
          </Link>
          <Link
            to="/donationRequests"
            className="btn btn-outline btn-secondary btn-lg px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Find Blood
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;