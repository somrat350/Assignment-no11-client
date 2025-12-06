const Featured = () => {
  const features = [
    {
      title: "Fast Donor Search",
      desc: "Find nearby blood donors within seconds using our smart search system.",
      icon: "❤️",
    },
    {
      title: "Verified Donors",
      desc: "All donors are verified to ensure reliability and safety.",
      icon: "🔍",
    },
    {
      title: "Emergency Requests",
      desc: "Post emergency blood requests instantly and reach thousands of donors.",
      icon: "🚑",
    },
    {
      title: "Community Support",
      desc: "Join a community that saves lives together through voluntary donation.",
      icon: "🤝",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <h2 className="text-3xl font-bold text-center text-secondary mb-10">
        Why Choose Blood Line?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 border border-secondary rounded-xl shadow-sm hover:shadow-md transition text-center"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl text-secondary font-semibold mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
