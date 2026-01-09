const BloodTypes = () => {
  const bloodTypes = [
    { type: "A+", compatibility: "A+, AB+", donors: "2,450" },
    { type: "A-", compatibility: "A+, A-, AB+, AB-", donors: "1,230" },
    { type: "B+", compatibility: "B+, AB+", donors: "2,100" },
    { type: "B-", compatibility: "B+, B-, AB+, AB-", donors: "890" },
    { type: "AB+", compatibility: "AB+ (Universal Receiver)", donors: "650" },
    { type: "AB-", compatibility: "AB+, AB-", donors: "320" },
    { type: "O+", compatibility: "A+, B+, AB+, O+", donors: "3,200" },
    { type: "O-", compatibility: "All Types (Universal Donor)", donors: "1,100" },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-b from-base-100 to-base-200">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            Blood Type Compatibility
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Understanding blood type compatibility is crucial for safe transfusions. Find your blood type and see who you can help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {bloodTypes.map((blood, index) => (
            <div
              key={index}
              className={`card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                blood.type === "O-" 
                  ? "bg-linear-to-br from-secondary to-secondary/80 text-base-100" 
                  : blood.type === "AB+"
                  ? "bg-linear-to-br from-primary to-primary/80 text-base-100"
                  : "bg-base-100 border border-secondary/20"
              }`}
            >
              <div className="card-body p-4 sm:p-6 text-center">
                {/* Special badges */}
                {blood.type === "O-" && (
                  <div className="badge badge-warning badge-sm absolute -top-2 -right-2">
                    Universal Donor
                  </div>
                )}
                {blood.type === "AB+" && (
                  <div className="badge badge-success badge-sm absolute -top-2 -right-2">
                    Universal Receiver
                  </div>
                )}

                <div className={`text-4xl sm:text-5xl font-bold mb-4 ${
                  blood.type === "O-" || blood.type === "AB+" 
                    ? "text-base-100" 
                    : "text-secondary"
                }`}>
                  {blood.type}
                </div>
                
                <div className="mb-4">
                  <div className={`text-sm font-semibold mb-2 ${
                    blood.type === "O-" || blood.type === "AB+" 
                      ? "text-base-100/90" 
                      : "text-base-content/70"
                  }`}>
                    Can donate to:
                  </div>
                  <div className={`text-sm ${
                    blood.type === "O-" || blood.type === "AB+" 
                      ? "text-base-100" 
                      : "text-base-content"
                  }`}>
                    {blood.compatibility}
                  </div>
                </div>

                <div className={`text-2xl font-bold ${
                  blood.type === "O-" || blood.type === "AB+" 
                    ? "text-base-100" 
                    : "text-secondary"
                }`}>
                  {blood.donors}
                </div>
                <div className={`text-sm ${
                  blood.type === "O-" || blood.type === "AB+" 
                    ? "text-base-100/90" 
                    : "text-base-content/70"
                }`}>
                  Available Donors
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <div className="alert alert-warning max-w-4xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="font-bold">Important Note</h3>
              <div className="text-sm">
                Blood type compatibility is critical for safe transfusions. Always consult with medical professionals 
                before any blood donation or transfusion procedure.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodTypes;