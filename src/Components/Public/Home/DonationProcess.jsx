import { FaUserMd, FaFlask, FaHeartbeat, FaCookie, FaShieldAlt, FaClock } from "react-icons/fa";

const DonationProcess = () => {
  const processSteps = [
    {
      icon: <FaUserMd className="text-4xl" />,
      title: "Medical Screening",
      description: "Quick health check and medical history review to ensure you're eligible to donate.",
      duration: "10-15 minutes",
      color: "from-primary to-primary/80"
    },
    {
      icon: <FaFlask className="text-4xl" />,
      title: "Blood Testing",
      description: "Small sample taken to check blood type, hemoglobin levels, and screen for infections.",
      duration: "5 minutes",
      color: "from-secondary to-secondary/80"
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: "Blood Donation",
      description: "The actual donation process where approximately 450ml of blood is collected safely.",
      duration: "8-10 minutes",
      color: "from-accent to-accent/80"
    },
    {
      icon: <FaCookie className="text-4xl" />,
      title: "Rest & Refreshment",
      description: "Relax and enjoy refreshments while your body begins to replenish the donated blood.",
      duration: "10-15 minutes",
      color: "from-success to-success/80"
    }
  ];

  const eligibilityRequirements = [
    { requirement: "Age 18-65 years", icon: "👤" },
    { requirement: "Weight minimum 50kg", icon: "⚖️" },
    { requirement: "Good general health", icon: "💪" },
    { requirement: "No recent illness", icon: "🌡️" },
    { requirement: "No recent travel to malaria areas", icon: "✈️" },
    { requirement: "No recent tattoos/piercings", icon: "🎨" }
  ];

  const safetyMeasures = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Sterile Equipment",
      description: "All needles and equipment are single-use and sterile"
    },
    {
      icon: <FaUserMd className="text-2xl" />,
      title: "Trained Staff",
      description: "Experienced medical professionals oversee the entire process"
    },
    {
      icon: <FaFlask className="text-2xl" />,
      title: "Blood Testing",
      description: "Every donation is tested for safety and compatibility"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Recovery Time",
      description: "Adequate rest period ensures your complete well-being"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-100 to-base-200">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            The Donation Process
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Donating blood is safe, simple, and takes less than an hour. Here's what to expect during your donation journey.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line (Desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-linear-to-r from-secondary/30 to-secondary transform -translate-y-1/2 z-0"></div>
                )}

                <div className="card bg-base-200 h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative z-10">
                  <div className="card-body p-6">
                    {/* Step Number */}
                    <div className="badge badge-secondary absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-base-100">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-base-100`}>
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-base-content mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-base-content/70 text-center mb-4">
                      {step.description}
                    </p>
                    <div className="text-center">
                      <span className="badge badge-outline badge-secondary">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Time */}
          <div className="text-center mt-12">
            <div className="card bg-linear-to-r from-secondary to-secondary/80 shadow-xl max-w-md mx-auto text-white">
              <div className="card-body p-6">
                <h3 className="text-2xl font-bold mb-2">Total Time</h3>
                <div className="text-4xl font-bold mb-2">45-60 minutes</div>
                <p className="">Complete donation experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-base-content mb-8 sm:mb-12">
            Eligibility Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {eligibilityRequirements.map((req, index) => (
              <div key={index} className="card bg-base-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="card-body p-6 text-center">
                  <div className="text-4xl mb-4">{req.icon}</div>
                  <div className="text-lg font-semibold text-base-content">
                    {req.requirement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Measures */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-base-content mb-8 sm:mb-12">
            Your Safety is Our Priority
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {safetyMeasures.map((measure, index) => (
              <div key={index} className="card bg-linear-to-br from-success/10 to-success/20 border border-success/30 shadow-lg">
                <div className="card-body p-6 text-center">
                  <div className="text-success mb-4 flex justify-center">
                    {measure.icon}
                  </div>
                  <h4 className="text-lg font-bold text-base-content mb-2">
                    {measure.title}
                  </h4>
                  <p className="text-base-content/70 text-sm">
                    {measure.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before and After Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Before Donation */}
          <div className="card bg-linear-to-br from-info/10 to-info/20 border border-info/30 shadow-lg">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-info mb-6 text-center">
                Before Donation
              </h3>
              <ul className="space-y-3 text-base-content/80">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-info rounded-full mr-3"></span>
                  Eat a healthy meal 3-4 hours before donating
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-info rounded-full mr-3"></span>
                  Drink plenty of water (16-20 oz)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-info rounded-full mr-3"></span>
                  Get a good night's sleep
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-info rounded-full mr-3"></span>
                  Avoid alcohol for 24 hours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-info rounded-full mr-3"></span>
                  Bring a valid ID
                </li>
              </ul>
            </div>
          </div>

          {/* After Donation */}
          <div className="card bg-linear-to-br from-success/10 to-success/20 border border-success/30 shadow-lg">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-success mb-6 text-center">
                After Donation
              </h3>
              <ul className="space-y-3 text-base-content/80">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                  Rest for 10-15 minutes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                  Drink extra fluids for 24 hours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                  Avoid heavy lifting for 24 hours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                  Keep the bandage on for 4-5 hours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                  Eat iron-rich foods
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="card bg-linear-to-r from-secondary to-secondary/80 shadow-xl max-w-4xl mx-auto">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Save Lives?</h3>
              <p className="text-lg mb-6">
                The donation process is safe, simple, and incredibly rewarding. Your one donation can save up to three lives.
              </p>
              <button className="btn btn-outline btn-lg">
                Schedule Your Donation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;