import {
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaNewspaper,
} from "react-icons/fa";

const NewsUpdates = () => {
  const news = [
    {
      id: 1,
      title: "World Blood Donor Day 2024: Celebrating Life-Saving Heroes",
      excerpt:
        "Join us in celebrating the heroes who donate blood and save lives every day. Special events and recognition ceremonies planned across the country.",
      category: "Events",
      date: "2024-06-14",
      author: "Dr. Sarah Ahmed",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      readTime: "3 min read",
      featured: true,
    },
    {
      id: 2,
      title: "New Blood Storage Technology Extends Shelf Life",
      excerpt:
        "Revolutionary storage technology now allows blood to be preserved for longer periods, reducing waste and improving availability for patients.",
      category: "Medical News",
      date: "2024-01-05",
      author: "Medical Team",
      image:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop",
      readTime: "5 min read",
      featured: true,
    },
  ];

  const featuredNews = news.filter((item) => item.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "Health Tips":
        return "badge-success";
      case "Success Stories":
        return "badge-secondary";
      case "Events":
        return "badge-info";
      case "Medical News":
        return "badge-warning";
      default:
        return "badge-primary";
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-100 to-base-200">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <FaNewspaper className="text-4xl sm:text-5xl text-secondary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            Latest News & Updates
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Stay informed about the latest developments in blood donation,
            health tips, and inspiring stories from our community.
          </p>
        </div>

        {/* Featured News */}
        <div className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredNews.map((article) => (
              <div
                key={article.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <figure className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-secondary shadow-lg">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-neutral shadow-lg">
                      {article.readTime}
                    </span>
                  </div>
                </figure>

                <div className="card-body p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`badge ${getCategoryBadge(article.category)}`}
                    >
                      {article.category}
                    </span>
                    <div className="flex items-center text-base-content/60 text-sm">
                      <FaCalendarAlt className="mr-2" />
                      {formatDate(article.date)}
                    </div>
                  </div>

                  <h3 className="card-title text-xl text-base-content mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-base-content/70 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="card-actions justify-between items-center">
                    <div className="flex items-center text-base-content/60 text-sm">
                      <FaUser className="mr-2" />
                      {article.author}
                    </div>
                    <button className="btn btn-secondary btn-sm">
                      Read More
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="card bg-base-300 shadow-xl max-w-4xl mx-auto">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-2xl text-secondary font-bold mb-4">Stay Updated</h3>
              <p className="text-lg mb-6">
                Subscribe to our newsletter to receive the latest news, health
                tips, and updates about blood donation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-secondary bg-base-300 input-lg w-full"
                />
                <button className="btn btn-outline btn-lg btn-secondary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-secondary mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;
