import AdminHome from "../../Components/Dashboard/Home/AdminHome";
import DonorHome from "../../Components/Dashboard/Home/DonorHome";
import Loading from "../../Components/Loading";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { FaHeart, FaTachometerAlt, FaUser, FaCrown } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  const { user, userLoading } = useAuth();
  
  if (isLoading || userLoading) return <Loading />;

  const getRoleInfo = () => {
    switch (role) {
      case "admin":
        return {
          icon: <FaCrown className="text-2xl" />,
          title: "Admin Dashboard",
          subtitle: "Manage the BloodLine Community",
          color: "from-warning to-warning/80",
          badge: "Administrator"
        };
      case "volunteer":
        return {
          icon: <FaHeart className="text-2xl" />,
          title: "Volunteer Dashboard", 
          subtitle: "Help Coordinate Life-Saving Efforts",
          color: "from-info to-info/80",
          badge: "Volunteer"
        };
      default:
        return {
          icon: <FaHeart className="text-2xl" />,
          title: "Donor Dashboard",
          subtitle: "Your Life-Saving Journey",
          color: "from-secondary to-secondary/80", 
          badge: "Hero Donor"
        };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden">
      <title>Dashboard | BloodLine</title>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 bg-linear-to-br ${roleInfo.color} rounded-2xl flex items-center justify-center text-base-100 shadow-lg animate-bounce`}>
              {roleInfo.icon}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
                  {roleInfo.title}
                </h1>
                <div className="badge badge-secondary badge-lg">
                  {roleInfo.badge}
                </div>
              </div>
              <p className="text-lg text-base-content/70">{roleInfo.subtitle}</p>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="card bg-base-100 shadow-2xl border border-base-300 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-linear-to-r from-secondary/5 to-primary/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="card-body p-6 sm:p-8 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                      <img 
                        src={user?.photoURL || "https://via.placeholder.com/150"} 
                        alt={user?.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
                      Welcome back, <span className="text-secondary">{user?.displayName || "Hero"}</span>!
                    </h2>
                    <p className="text-base-content/70 mt-1">
                      {role === "admin" || role === "volunteer" 
                        ? "Ready to make a difference in the BloodLine community?" 
                        : "Thank you for being a valuable blood donor and saving lives."
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-success">
                    <div className="w-2 h-2 bg-success rounded-full animate-ping mr-2"></div>
                    Active
                  </div>
                  <HiSparkles className="text-2xl text-secondary animate-pulse" />
                </div>
              </div>
              
              {/* Quick Stats Bar */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-base-200/50 rounded-xl">
                  <div className="text-lg font-bold text-secondary">Today</div>
                  <div className="text-xs text-base-content/60">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <div className="text-center p-3 bg-base-200/50 rounded-xl">
                  <div className="text-lg font-bold text-primary">Status</div>
                  <div className="text-xs text-base-content/60">Online</div>
                </div>
                <div className="text-center p-3 bg-base-200/50 rounded-xl">
                  <div className="text-lg font-bold text-accent">Role</div>
                  <div className="text-xs text-base-content/60 capitalize">{role}</div>
                </div>
                <div className="text-center p-3 bg-base-200/50 rounded-xl">
                  <div className="text-lg font-bold text-success">Impact</div>
                  <div className="text-xs text-base-content/60">High</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-4 right-4 opacity-20">
              <HiLightningBolt className="text-2xl text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Role-specific Content */}
        <div className="space-y-6">
          {role === "donor" && <DonorHome />}
          {(role === "admin" || role === "volunteer") && <AdminHome />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
