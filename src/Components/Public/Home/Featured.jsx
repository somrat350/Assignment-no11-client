import { FaSearch, FaShieldAlt, FaExclamationTriangle, FaUsers, FaHeart, FaClock, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

const Featured = () => {
  const features = [
    {
      title: "Smart Donor Search",
      desc: "AI-powered matching system finds compatible donors near you in seconds, filtering by blood type, location, and availability.",
      icon: <FaSearch className="text-3xl" />,
      color: "from-primary to-primary/80",
      stats: "10K+ Donors",
      highlight: "AI-Powered"
    },
    {
      title: "Verified & Safe",
      desc: "Every donor undergoes thorough verification including medical screening, background checks, and regular health updates.",
      icon: <FaShieldAlt className="text-3xl" />,
      color: "from-success to-success/80",
      stats: "99.9% Safe",
      highlight: "Medical Verified"
    },
    {
      title: "Emergency Response",
      desc: "24/7 emergency blood request system with instant notifications to thousands of nearby donors for critical situations.",
      icon: <FaExclamationTriangle className="text-3xl" />,
      color: "from-error to-error/80",
      stats: "< 30 min",
      highlight: "24/7 Available"
    },
    {
      title: "Life-Saving Community",
      desc: "Join a passionate community of heroes who have already saved over 50,000 lives through voluntary blood donation.",
      icon: <FaUsers className="text-3xl" />,
      color: "from-secondary to-secondary/80",
      stats: "50K+ Lives",
      highlight: "Community Driven"
    },
  ];

  const achievements = [
    { icon: <FaHeart />, number: "50,000+", label: "Lives Saved" },
    { icon: <FaClock />, number: "24/7", label: "Emergency Support" },
    { icon: <FaMapMarkerAlt />, number: "64", label: "Cities Covered" },
    { icon: <FaCheckCircle />, number: "99.9%", label: "Success Rate" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-100 to-base-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="badge badge-secondary badge-lg mb-4">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            Why Choose <span className="text-secondary">Blood Line</span>?
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Experience the most advanced, secure, and efficient blood donation platform designed to save lives and build communities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-base-300 hover:border-secondary"
            >
              <div className="card-body p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center text-base-100 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <div className="badge badge-outline badge-secondary badge-sm mb-1">
                      {feature.highlight}
                    </div>
                    <div className="text-2xl font-bold text-secondary">
                      {feature.stats}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-3 group-hover:text-secondary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-base-content mb-8">
            Our Achievements
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-secondary/20"
              >
                <div className="card-body p-4 sm:p-6 text-center">
                  <div className="text-secondary text-2xl sm:text-3xl mb-3">
                    {achievement.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-base-content mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-base-content/70">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card bg-linear-to-r from-secondary to-secondary/80 shadow-2xl max-w-4xl mx-auto text-white">
            <div className="card-body p-6 sm:p-8 lg:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-lg sm:text-xl mb-6">
                Join thousands of heroes who are already making a difference in their communities through blood donation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="btn btn-outline btn-ghost btn-lg">
                  <FaHeart className="mr-2" />
                  Become a Donor
                </button>
                <button className="btn btn-outline btn-ghost btn-lg">
                  Learn More About Us
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2" />
                  <span className="text-sm">Medically Verified</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="mr-2" />
                  <span className="text-sm">99.9% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
