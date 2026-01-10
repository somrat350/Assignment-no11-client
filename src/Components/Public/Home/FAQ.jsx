import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "How often can I donate blood?",
          answer: "You can donate whole blood every 56 days (8 weeks). This gives your body enough time to replenish the donated blood cells. Platelet donors can donate more frequently, up to 24 times per year."
        },
        {
          question: "How much blood is taken during donation?",
          answer: "During a standard whole blood donation, approximately 450ml (about one pint) of blood is collected. This represents less than 10% of your total blood volume and is safely replenished by your body within 24-48 hours."
        },
        {
          question: "Is blood donation safe?",
          answer: "Yes, blood donation is very safe. All equipment is sterile and used only once. The donation process is overseen by trained medical professionals, and strict safety protocols are followed to ensure donor safety."
        }
      ]
    },
    {
      category: "Eligibility",
      questions: [
        {
          question: "Who can donate blood?",
          answer: "Generally, healthy individuals aged 18-65 years, weighing at least 50kg, can donate blood. You should be in good health, not have donated blood in the last 56 days, and meet other medical eligibility criteria."
        },
        {
          question: "Can I donate if I have tattoos or piercings?",
          answer: "You can donate blood if your tattoo or piercing was done at least 4 months ago at a licensed facility using sterile equipment. Recent tattoos or piercings may require a waiting period."
        },
        {
          question: "Can I donate if I'm taking medications?",
          answer: "It depends on the medication. Many common medications don't prevent donation, but some may require a waiting period. Always inform the medical staff about any medications you're taking during the screening process."
        }
      ]
    },
    {
      category: "Process",
      questions: [
        {
          question: "How long does the donation process take?",
          answer: "The entire process typically takes 45-60 minutes, including registration, medical screening, the actual donation (8-10 minutes), and recovery time. First-time donors may need a bit more time for the initial screening."
        },
        {
          question: "Will I feel weak after donating?",
          answer: "Most donors feel fine after donation. You might feel slightly lightheaded initially, which is why we provide a rest period and refreshments. Drinking plenty of fluids and eating iron-rich foods helps with recovery."
        },
        {
          question: "What should I do before donating blood?",
          answer: "Eat a healthy meal 3-4 hours before donating, drink plenty of water, get adequate sleep, avoid alcohol for 24 hours, and bring a valid ID. Wear comfortable clothing with sleeves that can be rolled up easily."
        }
      ]
    },
    {
      category: "After Donation",
      questions: [
        {
          question: "What happens to my donated blood?",
          answer: "Your blood is tested for blood type and screened for infectious diseases. If it passes all tests, it's processed into components (red cells, plasma, platelets) and stored until needed by patients in hospitals."
        },
        {
          question: "How will I know if my blood was used?",
          answer: "While we can't provide specific details about recipients due to privacy, you'll receive updates about your donation's journey through our app, including when it's been processed and distributed to hospitals."
        },
        {
          question: "Can I find out my blood type through donation?",
          answer: "Yes! After your first donation, we'll provide you with your blood type information. This is often how many people first learn their blood type, and it's a valuable piece of medical information to have."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const faqIndex = categoryIndex * 100 + questionIndex;
    setOpenFAQ(openFAQ === faqIndex ? -1 : faqIndex);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-200 to-base-100">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <FaQuestionCircle className="text-4xl sm:text-5xl text-secondary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Got questions about blood donation? We've got answers. Here are the most common questions from our donors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8 sm:mb-12">
              {/* Category Header */}
              <div className="card bg-linear-to-r from-secondary to-secondary/80 text-white shadow-lg mb-4">
                <div className="card-body p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center">{category.category}</h3>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const faqIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openFAQ === faqIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="card-body p-4 sm:p-6 text-left flex items-center justify-between hover:bg-base-200 transition-colors duration-300"
                      >
                        <h4 className="text-lg font-semibold text-base-content pr-4">
                          {faq.question}
                        </h4>
                        <div className="shrink-0">
                          {isOpen ? (
                            <FaChevronUp className="text-secondary text-xl" />
                          ) : (
                            <FaChevronDown className="text-secondary text-xl" />
                          )}
                        </div>
                      </button>

                      {/* Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-base-300">
                          <p className="text-base-content/70 leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="card bg-linear-to-r from-info/10 to-info/20 border border-info/30 shadow-xl max-w-4xl mx-auto">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-info mb-4">
                Still Have Questions?
              </h3>
              <p className="text-base-content/70 mb-6 text-lg">
                Our medical team is here to help. Contact us for personalized answers to your blood donation questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="btn btn-info text-base-100">
                  Contact Medical Team
                </button>
                <button className="btn btn-outline btn-info">
                  Live Chat Support
                </button>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="card bg-base-100/50 shadow-sm">
                  <div className="card-body p-4">
                    <div className="text-2xl mb-2">📞</div>
                    <div className="font-semibold text-info">Phone</div>
                    <div className="text-base-content/70">+880 1746596989</div>
                  </div>
                </div>
                <div className="card bg-base-100/50 shadow-sm">
                  <div className="card-body p-4">
                    <div className="text-2xl mb-2">📧</div>
                    <div className="font-semibold text-info">Email</div>
                    <div className="text-base-content/70">support@bloodline.com</div>
                  </div>
                </div>
                <div className="card bg-base-100/50 shadow-sm">
                  <div className="card-body p-4">
                    <div className="text-2xl mb-2">💬</div>
                    <div className="font-semibold text-info">Live Chat</div>
                    <div className="text-base-content/70">24/7 Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;