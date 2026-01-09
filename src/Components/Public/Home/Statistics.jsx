import { useState, useEffect } from "react";
import { FaUsers, FaTint, FaHeart, FaHospital, FaClock, FaGlobe } from "react-icons/fa";

const Statistics = () => {
  const [counters, setCounters] = useState({
    donors: 0,
    donations: 0,
    livesSaved: 0,
    hospitals: 0,
    emergencyResponses: 0,
    cities: 0
  });

  const finalStats = {
    donors: 12547,
    donations: 45632,
    livesSaved: 89234,
    hospitals: 156,
    emergencyResponses: 2847,
    cities: 64
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalStats).map(key => {
      const increment = finalStats[key] / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalStats[key]) {
          currentValue = finalStats[key];
          clearInterval(intervals[Object.keys(finalStats).indexOf(key)]);
        }
        
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepDuration);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  const stats = [
    {
      icon: <FaUsers className="text-4xl" />,
      value: counters.donors.toLocaleString(),
      label: "Registered Donors",
      color: "from-primary to-primary/80",
      description: "Active blood donors ready to help"
    },
    {
      icon: <FaTint className="text-4xl" />,
      value: counters.donations.toLocaleString(),
      label: "Blood Donations",
      color: "from-secondary to-secondary/80",
      description: "Successful blood donations completed"
    },
    {
      icon: <FaHeart className="text-4xl" />,
      value: counters.livesSaved.toLocaleString(),
      label: "Lives Saved",
      color: "from-accent to-accent/80",
      description: "Lives saved through blood donations"
    },
    {
      icon: <FaHospital className="text-4xl" />,
      value: counters.hospitals.toLocaleString(),
      label: "Partner Hospitals",
      color: "from-success to-success/80",
      description: "Hospitals connected to our network"
    },
    {
      icon: <FaClock className="text-4xl" />,
      value: counters.emergencyResponses.toLocaleString(),
      label: "Emergency Responses",
      color: "from-warning to-warning/80",
      description: "Emergency blood requests fulfilled"
    },
    {
      icon: <FaGlobe className="text-4xl" />,
      value: counters.cities.toLocaleString(),
      label: "Cities Covered",
      color: "from-info to-info/80",
      description: "Cities where our service is available"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-200 to-base-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-secondary/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-base-content">
            Our Impact in Numbers
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Every number represents a life touched, a family helped, and a community strengthened through the power of blood donation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-base-300"
            >
              <div className="card-body p-6 sm:p-8 text-center">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-base-content">
                    {stat.value}
                  </div>
                  
                  <div className="text-lg sm:text-xl font-semibold mb-3 text-base-content">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-base-content/70">
                    {stat.description}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="card bg-base-100 shadow-xl border border-secondary/20 max-w-4xl mx-auto">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-4 text-base-content">Real-Time Impact</h3>
              <p className="text-lg text-base-content/70 mb-6">
                These numbers are updated in real-time as our community continues to grow and save lives every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-success">
                  <div className="w-3 h-3 bg-success rounded-full mr-2 animate-pulse"></div>
                  <span>Live Updates</span>
                </div>
                <div className="flex items-center text-info">
                  <div className="w-3 h-3 bg-info rounded-full mr-2 animate-pulse"></div>
                  <span>24/7 Monitoring</span>
                </div>
                <div className="flex items-center text-warning">
                  <div className="w-3 h-3 bg-warning rounded-full mr-2 animate-pulse"></div>
                  <span>Verified Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;