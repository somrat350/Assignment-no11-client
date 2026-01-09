import { FaUserPlus, FaSearch, FaHandshake, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl" />,
      title: "Register",
      description: "Sign up as a blood donor or recipient. Complete your profile with medical information.",
      color: "from-primary to-primary/80"
    },
    {
      icon: <FaSearch className="text-4xl" />,
      title: "Search",
      description: "Find compatible blood donors near you or post a blood request for emergency needs.",
      color: "from-secondary to-secondary/80"
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: "Connect",
      description: "Connect with donors or recipients through our secure messaging system.",
      color: "from-accent to-accent/80"
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Save Lives",
      description: "Complete the donation process and help save lives in your community.",
      color: "from-success to-success/80"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-base-200">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Our simple 4-step process makes it easy to donate blood or find donors when you need them most.
          </p>
        </div>

        <div className="">
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-success transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-4 gap-8 relative z-10">
                {steps.map((step, index) => (
                  <div key={index} className="text-center flex flex-col">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-base-100 shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-fit flex-1">
                      <div className="card-body p-6">
                        <h3 className="text-xl font-bold text-base-content mb-3">
                          {index + 1}. {step.title}
                        </h3>
                        <p className="text-base-content/70">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {/* Vertical Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-1 h-16 bg-linear-to-b from-primary via-secondary to-success z-0"></div>
                )}
                
                <div className={`w-16 h-16 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-base-100 shadow-lg shrink-0 relative z-10`}>
                  {step.icon}
                </div>
                <div className="card bg-base-100 shadow-lg flex-1">
                  <div className="card-body p-6">
                    <h3 className="text-xl font-bold text-base-content mb-3">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-base-content/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <div className="card bg-secondary text-white shadow-xl max-w-4xl mx-auto">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
              <p className="text-lg mb-6">Join thousands of heroes who are already saving lives through blood donation.</p>
              <button className="btn btn-outline btn-lg">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;