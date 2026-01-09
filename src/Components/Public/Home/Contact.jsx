import { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaUser,
  FaComments,
  FaHeadset,
  FaHeart,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    contactReason: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [onlineUsers, setOnlineUsers] = useState(247);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate online users fluctuation
  useEffect(() => {
    const userTimer = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);
    return () => clearInterval(userTimer);
  }, []);

  // Typing indicator
  useEffect(() => {
    if (formData.message.length > 0) {
      setIsTyping(true);
      const typingTimer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(typingTimer);
    }
  }, [formData.message]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    else if (formData.message.length < 10)
      errors.message = "Message must be at least 10 characters";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission with realistic delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        contactReason: "general",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      info: "+880 1746596989",
      subInfo: "Available 24/7 for emergencies",
      color: "from-success to-success/80",
      action: "tel:+8801746596989",
      status: "online",
      responseTime: "Immediate",
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      info: "support@bloodline.com",
      subInfo: "We'll respond within 2 hours",
      color: "from-info to-info/80",
      action: "mailto:support@bloodline.com",
      status: "online",
      responseTime: "< 2 hours",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      info: "123 Health Street, Dhaka",
      subInfo: "Open Mon-Fri, 9AM-6PM",
      color: "from-warning to-warning/80",
      action: "#",
      status:
        currentTime.getHours() >= 9 && currentTime.getHours() < 18
          ? "open"
          : "closed",
      responseTime: "Walk-in",
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "Live Chat",
      info: `${onlineUsers} agents online`,
      subInfo: "Average response: 2 minutes",
      color: "from-secondary to-secondary/80",
      action: "#",
      status: "online",
      responseTime: "< 2 min",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-600",
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "#",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      url: "#",
      color: "hover:text-pink-500",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "#",
      color: "hover:text-blue-700",
    },
  ];

  const contactReasons = [
    { value: "general", label: "General Inquiry", icon: <FaComments /> },
    { value: "emergency", label: "Emergency Blood Need", icon: <FaHeart /> },
    { value: "donor", label: "Become a Donor", icon: <FaUser /> },
    { value: "support", label: "Technical Support", icon: <FaHeadset /> },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-200 to-base-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-bounce">
            <div className="alert alert-success shadow-2xl max-w-sm">
              <FaCheckCircle className="text-xl" />
              <div>
                <h3 className="font-bold">Message Sent!</h3>
                <div className="text-xs">We'll get back to you soon.</div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="badge badge-secondary badge-lg mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            Contact <span className="text-secondary">Us</span>
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Have questions about blood donation? Need emergency assistance?
            We're here to help 24/7.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-base-300 hover:border-secondary/30 relative overflow-hidden"
            >
              {/* Status Indicator */}
              <div className="absolute top-3 right-3 z-10">
                <div
                  className={`badge badge-xs ${
                    method.status === "online" || method.status === "open"
                      ? "badge-success"
                      : "badge-error"
                  } animate-pulse`}
                >
                  {method.status}
                </div>
              </div>

              {/* Animated Background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <a
                href={method.action}
                className="card-body p-6 text-center relative z-10"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br ${method.color} flex items-center justify-center text-base-100 shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}
                >
                  {method.icon}
                  {(method.status === "online" || method.status === "open") && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-ping"></div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-base-content mb-2 group-hover:text-secondary transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-base-content font-semibold mb-1">
                  {method.info}
                </p>
                <p className="text-sm text-base-content/60 mb-2">
                  {method.subInfo}
                </p>
                <div className="badge badge-outline badge-xs">
                  {method.responseTime}
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="card bg-base-100 shadow-2xl border border-base-300 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="card-body p-6 sm:p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-base-content flex items-center">
                  <FaPaperPlane className="mr-3 text-secondary" />
                  Send us a Message
                </h3>
                {isTyping && (
                  <div className="flex items-center text-sm text-secondary animate-pulse">
                    <HiSparkles className="mr-1" />
                    Typing...
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Reason */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold flex items-center">
                      What can we help you with?
                      <HiLightningBolt className="ml-2 text-secondary" />
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {contactReasons.map((reason) => (
                      <label
                        key={reason.value}
                        className="cursor-pointer group"
                      >
                        <div
                          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                            formData.contactReason === reason.value
                              ? "border-secondary bg-secondary/10"
                              : "border-base-300 hover:border-secondary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactReason"
                            value={reason.value}
                            checked={formData.contactReason === reason.value}
                            onChange={handleInputChange}
                            className="radio radio-secondary mr-2"
                          />
                          <span className="text-sm flex items-center">
                            <span
                              className={`mr-2 transition-colors duration-300 ${
                                formData.contactReason === reason.value
                                  ? "text-secondary"
                                  : ""
                              }`}
                            >
                              {reason.icon}
                            </span>
                            {reason.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Your Name
                      </span>
                      {formErrors.name && (
                        <span className="label-text-alt text-error flex items-center">
                          <FaExclamationTriangle className="mr-1" />
                          {formErrors.name}
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`input input-bordered w-full pl-12 transition-all duration-300 ${
                          formErrors.name
                            ? "input-error focus:input-error"
                            : "focus:input-secondary"
                        }`}
                        required
                      />
                      <FaUser
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          formData.name
                            ? "text-secondary"
                            : "text-base-content/40"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Your Email
                      </span>
                      {formErrors.email && (
                        <span className="label-text-alt text-error flex items-center">
                          <FaExclamationTriangle className="mr-1" />
                          {formErrors.email}
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`input input-bordered w-full pl-12 transition-all duration-300 ${
                          formErrors.email
                            ? "input-error focus:input-error"
                            : "focus:input-secondary"
                        }`}
                        required
                      />
                      <FaEnvelope
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          formData.email
                            ? "text-secondary"
                            : "text-base-content/40"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Subject</span>
                    {formErrors.subject && (
                      <span className="label-text-alt text-error flex items-center">
                        <FaExclamationTriangle className="mr-1" />
                        {formErrors.subject}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief subject of your message"
                    className={`input input-bordered w-full transition-all duration-300 ${
                      formErrors.subject
                        ? "input-error focus:input-error"
                        : "focus:input-secondary"
                    }`}
                    required
                  />
                </div>

                {/* Message */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Message</span>
                    <span className="label-text-alt">
                      {formData.message.length}/500 characters
                    </span>
                  </label>{" "}
                  <br />
                  {formErrors.message && (
                    <div className="label">
                      <span className="label-text-alt text-error flex items-center">
                        <FaExclamationTriangle className="mr-1" />
                        {formErrors.message}
                      </span>
                    </div>
                  )}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    maxLength="500"
                    className={`textarea textarea-bordered h-32 resize-none transition-all duration-300 ${
                      formErrors.message
                        ? "textarea-error focus:textarea-error"
                        : "focus:textarea-secondary"
                    }`}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-secondary btn-lg w-full text-base-100 transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting ? "loading" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Form Progress Indicator */}
                <div className="w-full bg-base-300 rounded-full h-2 mt-4">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (Object.values(formData).filter(
                          (value) => value.trim() !== ""
                        ).length /
                          5) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-center text-base-content/60">
                  Form completion:{" "}
                  {Math.round(
                    (Object.values(formData).filter(
                      (value) => value.trim() !== ""
                    ).length /
                      5) *
                      100
                  )}
                  %
                </p>
              </form>
            </div>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-6">
            {/* Office Hours */}
            <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300">
              <div className="card-body p-6">
                <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
                  <FaClock className="mr-3 text-secondary" />
                  Office Hours
                  <div className="ml-auto">
                    <div
                      className={`badge ${
                        currentTime.getHours() >= 9 &&
                        currentTime.getHours() < 18
                          ? "badge-success"
                          : "badge-error"
                      } animate-pulse`}
                    >
                      {currentTime.getHours() >= 9 &&
                      currentTime.getHours() < 18
                        ? "Open Now"
                        : "Closed"}
                    </div>
                  </div>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-base-200 transition-colors duration-200">
                    <span className="text-base-content/70">
                      Monday - Friday
                    </span>
                    <span className="font-semibold text-base-content">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-base-200 transition-colors duration-200">
                    <span className="text-base-content/70">Saturday</span>
                    <span className="font-semibold text-base-content">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-base-200 transition-colors duration-200">
                    <span className="text-base-content/70">Sunday</span>
                    <span className="font-semibold text-base-content">
                      Closed
                    </span>
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                    <span className="text-base-content/70">Emergency Line</span>
                    <span className="font-semibold text-secondary flex items-center">
                      <div className="w-2 h-2 bg-success rounded-full animate-ping mr-2"></div>
                      24/7 Available
                    </span>
                  </div>
                  <div className="mt-4 p-3 bg-base-200 rounded-lg">
                    <div className="text-sm text-base-content/70 mb-1">
                      Current Time
                    </div>
                    <div className="font-mono text-lg font-bold text-secondary">
                      {currentTime.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 group">
              <div className="card-body p-6">
                <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-secondary" />
                  Our Location
                </h3>
                <div className="bg-linear-to-br from-base-200 to-base-300 rounded-xl h-48 flex items-center justify-center mb-4 relative overflow-hidden group-hover:from-secondary/10 group-hover:to-secondary/5 transition-all duration-500">
                  {/* Animated Background Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-secondary/20 rounded-full animate-bounce"></div>
                  <div
                    className="absolute bottom-4 right-4 w-6 h-6 bg-primary/20 rounded-full animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 right-8 w-4 h-4 bg-accent/20 rounded-full animate-bounce"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  <div className="text-center z-10">
                    <FaMapMarkerAlt className="text-4xl text-secondary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-base-content/70 font-semibold">
                      Interactive Map
                    </p>
                    <p className="text-sm text-base-content/50">
                      123 Health Street, Dhaka, Bangladesh
                    </p>
                    <div className="mt-2 flex items-center justify-center text-xs text-secondary">
                      <div className="w-2 h-2 bg-secondary rounded-full animate-ping mr-2"></div>
                      Live Location
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn btn-outline btn-secondary btn-sm hover:scale-105 transition-transform duration-200">
                    <FaMapMarkerAlt className="mr-1" />
                    Directions
                  </button>
                  <button className="btn btn-outline btn-secondary btn-sm hover:scale-105 transition-transform duration-200">
                    <FaPhone className="mr-1" />
                    Call Now
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300">
              <div className="card-body p-6">
                <h3 className="text-xl font-bold text-base-content mb-4">
                  Follow Us
                </h3>
                <div className="flex justify-center space-x-4 mb-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`btn btn-circle btn-outline btn-secondary hover:btn-secondary transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${social.color} group relative`}
                      title={social.name}
                    >
                      {social.icon}
                      {/* Hover tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-base-content text-base-100 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {social.name}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-base-content/60 mb-2">
                    Stay connected for updates and health tips
                  </p>
                  <div className="flex items-center justify-center text-xs text-secondary">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
                    {Math.floor(Math.random() * 1000) + 500}+ followers online
                  </div>
                </div>

                {/* Quick Social Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="btn btn-ghost btn-xs hover:btn-secondary hover:text-base-100 transition-all duration-200">
                    📢 Latest News
                  </button>
                  <button className="btn btn-ghost btn-xs hover:btn-secondary hover:text-base-100 transition-all duration-200">
                    💬 Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
