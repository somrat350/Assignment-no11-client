const Contact = () => {
  return (
    <div className="py-16 bg-red-50">
      <h2 className="text-3xl font-bold text-center text-secondary mb-10">
        Contact Us
      </h2>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <form className="grid grid-cols-1 gap-6">
          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            className="input w-full"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            className="input w-full"
            required
          />

          {/* Message */}
          <textarea
            placeholder="Your Message"
            className="textarea w-full h-28"
            required
          ></textarea>

          {/* Button */}
          <button type="submit" className="btn btn-secondary">
            Send Message
          </button>
        </form>

        {/* Contact Number */}
        <div className="text-center mt-8">
          <p className="text-lg font-semibold">📞 Contact Number:</p>
          <p className="text-xl text-secondary font-bold">+880 1746596989</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
