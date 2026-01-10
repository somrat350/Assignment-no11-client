import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { HiChevronUp } from "react-icons/hi";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show button when page is scrolled down 100px and calculate scroll progress
  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;

      if (scrolled > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Progress Ring */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-base-300"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-secondary"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${scrollProgress}, 100`}
                strokeLinecap="round"
                fill="transparent"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            {/* Button - Centered */}
            <button
              onClick={scrollToTop}
              className="z-60 w-10 h-10 btn btn-secondary btn-circle shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group flex items-center justify-center"
              title="Back to Top"
            >
              <HiChevronUp className="text-xl text-white group-hover:animate-bounce" />
            </button>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-base-content text-base-100 text-xs px-2 py-1 rounded whitespace-nowrap">
              Back to Top ({Math.round(scrollProgress)}%)
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackToTop;
