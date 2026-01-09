import { useState, useRef } from "react";
import { FaExclamationTriangle, FaClock, FaMapMarkerAlt, FaTint, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EmergencyAlert = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null);

  const emergencyRequests = [
    {
      id: 1,
      bloodType: "O-",
      location: "Dhaka Medical College Hospital",
      urgency: "Critical",
      timeLeft: "2 hours",
      patient: "Child Patient",
      contact: "+880 1234567890",
      description: "Urgent need for O- blood for emergency surgery"
    },
    {
      id: 2,
      bloodType: "AB+",
      location: "Square Hospital, Dhaka",
      urgency: "Urgent",
      timeLeft: "6 hours",
      patient: "Adult Patient",
      contact: "+880 1234567891",
      description: "Blood needed for cancer treatment procedure"
    },
    {
      id: 3,
      bloodType: "B-",
      location: "Chittagong Medical College",
      urgency: "Emergency",
      timeLeft: "4 hours",
      patient: "Elderly Patient",
      contact: "+880 1234567892",
      description: "Critical blood requirement for heart surgery"
    },
    {
      id: 4,
      bloodType: "A+",
      location: "Sylhet MAG Osmani Medical College",
      urgency: "Critical",
      timeLeft: "3 hours",
      patient: "Young Adult",
      contact: "+880 1234567893",
      description: "Emergency blood needed for accident victim"
    }
  ];

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case "Critical": return "badge-error";
      case "Emergency": return "badge-warning";
      case "Urgent": return "badge-info";
      default: return "badge-secondary";
    }
  };

  // const getUrgencyGradient = (urgency) => {
  //   switch (urgency) {
  //     case "Critical": return "from-error to-error/80";
  //     case "Emergency": return "from-warning to-warning/80";
  //     case "Urgent": return "from-info to-info/80";
  //     default: return "from-secondary to-secondary/80";
  //   }
  // };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-base-200 to-base-300">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <FaExclamationTriangle className="text-3xl sm:text-4xl text-secondary mr-3 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content">
              Emergency Blood Requests
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Lives are at stake. These patients need your help right now.
          </p>
        </div>

        {/* Main Emergency Slider */}
        <div className="w-full mb-8 sm:mb-12 relative">
          <Swiper
          // loop={true}
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            className="emergency-swiper border border-secondary rounded-2xl"
          >
            {emergencyRequests.map((request) => (
              <SwiperSlide key={request.id}>
                {/* ${getUrgencyGradient(request.urgency)} */}
                <div className={`bg-base-100 rounded-2xl p-6 sm:p-8 shadow-2xl`}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                    {/* Blood Type & Urgency */}
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        <div className="bg-base-100/20 backdrop-blur-sm rounded-full p-4 mr-4">
                          <FaTint className="text-3xl sm:text-4xl" />
                        </div>
                        <div>
                          <div className="text-4xl sm:text-5xl font-bold">{request.bloodType}</div>
                          <div className={`badge ${getUrgencyBadge(request.urgency)} badge-lg mt-2`}>
                            {request.urgency}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-center lg:justify-start">
                        <FaMapMarkerAlt className="mr-3 text-lg" />
                        <span className="text-sm sm:text-base">{request.location}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start">
                        <FaClock className="mr-3 text-lg" />
                        <span className="text-sm sm:text-base font-semibold">Time Left: {request.timeLeft}</span>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-sm sm:text-base opacity-90">Patient: {request.patient}</div>
                        <div className="text-xs sm:text-sm opacity-80 mt-1">{request.description}</div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="text-center">
                      <button className="btn btn-secondary btn-lg mb-4 w-full sm:w-auto">
                        I Can Help
                      </button>
                      <div className="text-xs sm:text-sm opacity-90">
                        Contact: {request.contact}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-secondary shadow-lg">
            <FaChevronLeft />
          </button>
          <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-secondary shadow-lg">
            <FaChevronRight />
          </button>
        </div>

        {/* All Emergency Requests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {emergencyRequests.map((request, index) => (
            <div
              key={request.id}
              onClick={() => {
                setCurrentSlide(index);
                swiperRef.current?.swiper.slideTo(index);
              }}
              className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-l-4 ${
                request.urgency === "Critical" ? "border-error" :
                request.urgency === "Emergency" ? "border-warning" :
                request.urgency === "Urgent" ? "border-info" :
                "border-secondary"
              } ${currentSlide === index ? 'ring-2 ring-secondary' : ''}`}
            >
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xl sm:text-2xl font-bold text-secondary">{request.bloodType}</div>
                  <div className={`badge ${getUrgencyBadge(request.urgency)} badge-sm`}>
                    {request.urgency}
                  </div>
                </div>
                
                <div className="space-y-2 text-xs sm:text-sm text-base-content/70 mb-4">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-secondary" />
                    <span className="truncate">{request.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-secondary" />
                    <span>{request.timeLeft} left</span>
                  </div>
                  <div className="text-xs opacity-60">
                    {request.patient}
                  </div>
                </div>

                <button className="btn btn-secondary btn-sm w-full text-base-100">
                  Respond Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-4">
                Want to Post an Emergency Request?
              </h3>
              <p className="text-base-content/70 mb-6 text-sm sm:text-base">
                If you need blood urgently, post your request and reach thousands of donors instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-secondary">
                  Post Emergency Request
                </button>
                <button className="btn btn-outline btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .emergency-swiper .swiper-pagination {
          bottom: -40px !important;
        }
        
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: hsl(var(--bc) / 0.3);
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: hsl(var(--s));
          transform: scale(1.2);
        }
        
        @media (max-width: 640px) {
          .swiper-pagination-bullet-custom {
            width: 8px;
            height: 8px;
            margin: 0 4px;
          }
        }
      `}</style>
    </section>
  );
};

export default EmergencyAlert;