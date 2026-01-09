import { useState } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Blood Recipient",
      location: "Dhaka, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "BloodLine saved my daughter's life during her emergency surgery. Within 30 minutes, we found a compatible donor. I can't thank this platform enough for connecting us with such generous people.",
      bloodType: "O-",
      story: "Emergency surgery for my 8-year-old daughter",
    },
    {
      id: 2,
      name: "Dr. Mohammad Rahman",
      role: "Hematologist",
      location: "Chittagong Medical College",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a doctor, I've seen how BloodLine has revolutionized blood donation in Bangladesh. The platform is reliable, fast, and has helped us save countless lives in critical situations.",
      bloodType: "AB+",
      story: "Treating patients with blood disorders",
    },
    {
      id: 3,
      name: "Fatima Khan",
      role: "Regular Donor",
      location: "Sylhet, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I've donated blood 15 times through BloodLine. The app makes it so easy to find people who need help. Every donation feels meaningful when you know exactly who you're helping.",
      bloodType: "A+",
      story: "Donated blood to 15 different patients",
    },
    {
      id: 4,
      name: "Rashid Hassan",
      role: "Cancer Survivor",
      location: "Rajshahi, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "During my cancer treatment, I needed multiple blood transfusions. BloodLine connected me with donors who became like family. Their support went beyond just blood donation.",
      bloodType: "B-",
      story: "Received 12 blood transfusions during cancer treatment",
    },
    {
      id: 5,
      name: "Nurse Ayesha Begum",
      role: "ICU Nurse",
      location: "Square Hospital, Dhaka",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Working in ICU, I see the urgent need for blood daily. BloodLine has been a game-changer for our hospital. We can quickly find donors even for rare blood types.",
      bloodType: "AB-",
      story: "Coordinating blood donations for ICU patients",
    },
    {
      id: 6,
      name: "Sarah Ahmed",
      role: "Blood Recipient",
      location: "Dhaka, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "BloodLine saved my daughter's life during her emergency surgery. Within 30 minutes, we found a compatible donor. I can't thank this platform enough for connecting us with such generous people.",
      bloodType: "O-",
      story: "Emergency surgery for my 8-year-old daughter",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-200 to-base-100">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            Stories That Inspire
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Real stories from real people whose lives have been touched by the
            power of blood donation.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
          <div className="card bg-base-100 shadow-2xl relative overflow-hidden">
            <div className="card-body p-6 sm:p-8 lg:p-12">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-3xl sm:text-4xl text-secondary mb-6" />

                {/* Testimonial Text */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-base-content leading-relaxed mb-6 sm:mb-8 italic">
                  "{current.text}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning text-xl mr-1" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                  <div className="flex items-center text-center sm:text-left">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-secondary/20"
                    />
                    <div>
                      <div className="text-xl font-bold text-base-content">
                        {current.name}
                      </div>
                      <div className="text-secondary font-semibold">
                        {current.role}
                      </div>
                      <div className="text-base-content/60 text-sm">
                        {current.location}
                      </div>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="badge badge-secondary badge-lg mb-2">
                      Blood Type: {current.bloodType}
                    </div>
                    <div className="text-sm text-base-content/60">
                      {current.story}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="btn btn-circle btn-secondary shadow-lg hover:shadow-xl"
            >
              <FaChevronLeft />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-secondary scale-125"
                      : "bg-base-content/30 hover:bg-secondary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="btn btn-circle btn-secondary shadow-lg hover:shadow-xl"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => setCurrentTestimonial(index)}
              className={`card bg-base-100 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                index === currentTestimonial
                  ? "ring-2 ring-secondary bg-secondary/5"
                  : ""
              }`}
            >
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-bold text-base-content">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-secondary">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning text-sm mr-1" />
                  ))}
                </div>

                <p className="text-base-content/70 text-sm line-clamp-3">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
