import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaUsers,
  FaHandHoldingHeart,
  FaChartLine,
  FaAward,
  FaTint,
  FaMapMarkerAlt,
  FaCrown,
  FaHeart,
} from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { LuGitPullRequest } from "react-icons/lu";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();

  // Fetch all users
  const { data: allUsers = 0, isLoading: loadingUsers } = useQuery({
    queryKey: ["all-users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/allUsers?email=${user?.email}`);
      return res.data.total;
    },
  });

  // Fetch all requests
  const { data: allRequests = 0, isLoading: loadingRequests } = useQuery({
    queryKey: ["all-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/allRequests?email=${user?.email}`);
      return res.data.total;
    },
  });

  // Fetch all funding
  const { data: totalAmount, isLoading: loadingFunding } = useQuery({
    queryKey: ["totalAmount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/totalAmount`);
      return res.data;
    },
  });

  // Mock data for charts - replace with actual API calls
  const { data: adminStats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      return {
        bloodGroupDistribution: [
          { bloodGroup: "A+", count: 45, color: "#ef4444" },
          { bloodGroup: "O+", count: 38, color: "#f97316" },
          { bloodGroup: "B+", count: 32, color: "#eab308" },
          { bloodGroup: "AB+", count: 28, color: "#22c55e" },
          { bloodGroup: "A-", count: 15, color: "#06b6d4" },
          { bloodGroup: "O-", count: 12, color: "#3b82f6" },
          { bloodGroup: "B-", count: 10, color: "#8b5cf6" },
          { bloodGroup: "AB-", count: 8, color: "#ec4899" },
        ],
        monthlyGrowth: [
          { month: "Jan", users: 120, requests: 45, funding: 15000 },
          { month: "Feb", users: 145, requests: 52, funding: 18500 },
          { month: "Mar", users: 168, requests: 48, funding: 22000 },
          { month: "Apr", users: 192, requests: 61, funding: 25500 },
          { month: "May", users: 215, requests: 58, funding: 28000 },
          { month: "Jun", users: 238, requests: 67, funding: 32000 },
        ],
        requestStatus: [
          { status: "Completed", count: 156, color: "#10b981" },
          { status: "Pending", count: 89, color: "#f59e0b" },
          { status: "In Progress", count: 45, color: "#3b82f6" },
          { status: "Canceled", count: 23, color: "#ef4444" },
        ],
        regionData: [
          { region: "Dhaka", donors: 85, requests: 45 },
          { region: "Chittagong", donors: 62, requests: 32 },
          { region: "Sylhet", donors: 48, requests: 28 },
          { region: "Rajshahi", donors: 41, requests: 22 },
          { region: "Khulna", donors: 35, requests: 18 },
          { region: "Barisal", donors: 28, requests: 15 },
        ],
      };
    },
  });

  if (loadingRequests || loadingUsers || loadingFunding || statsLoading)
    return <Loading />;

  const mainStats = [
    {
      title: "Total Users",
      value: allUsers,
      icon: <FaUsers />,
      color: "from-secondary to-secondary/80",
      change: "+12.5%",
      description: "Registered Heroes",
    },
    {
      title: "Total Funding",
      value: totalAmount,
      icon: <FaBangladeshiTakaSign />,
      color: "from-success to-success/80",
      change: "+18.2%",
      description: "Community Support",
      prefix: "৳",
    },
    {
      title: "Total Requests",
      value: allRequests,
      icon: <LuGitPullRequest />,
      color: "from-info to-info/80",
      change: "+8.7%",
      description: "Life-Saving Requests",
    },
    {
      title: "Success Rate",
      value: allRequests > 0 ? Math.round((156 / allRequests) * 100) : 0, // Using mock completed count
      icon: <FaAward />,
      color: "from-warning to-warning/80",
      change: "+5.3%",
      description: "Request Completion",
      suffix: "%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="card-body p-6 relative overflow-hidden">
              {/* Background Pattern */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${stat.color} opacity-10 rounded-full blur-xl`}
              ></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-lg"></div>

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div
                  className={`w-14 h-14 bg-linear-to-br ${stat.color} rounded-2xl flex items-center justify-center text-base-100 shadow-lg`}
                >
                  {stat.icon}
                </div>
                <div className="text-xs text-success font-semibold bg-success/10 px-2 py-1 rounded-full">
                  {stat.change}
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-3xl font-bold text-base-content mb-1">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-lg font-semibold text-base-content mb-1">
                  {stat.title}
                </div>
                <div className="text-sm text-base-content/60">
                  {stat.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Group Distribution */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
              <FaTint className="mr-3 text-secondary" />
              Blood Group Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminStats.bloodGroupDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bloodGroup" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Request Status Pie Chart */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
              <FaChartLine className="mr-3 text-secondary" />
              Request Status Overview
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adminStats.requestStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {adminStats.requestStatus?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Trends */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-6">
          <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
            <HiLightningBolt className="mr-3 text-secondary" />
            Platform Growth Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adminStats.monthlyGrowth}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="colorRequests"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Total Users"
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRequests)"
                  name="Total Requests"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Regional Distribution */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-6">
          <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-3 text-secondary" />
            Regional Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminStats.regionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="donors"
                  fill="#8b5cf6"
                  name="Donors"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="requests"
                  fill="#10b981"
                  name="Requests"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-linear-to-br from-secondary to-secondary/80 text-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="card-body p-6 text-center">
            <FaUsers className="text-3xl mx-auto mb-3" />
            <h4 className="font-bold">Manage Users</h4>
            <p className="text-sm opacity-90">
              View and manage all registered users
            </p>
          </div>
        </div>

        <div className="card bg-linear-to-br from-info to-info/80 text-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="card-body p-6 text-center">
            <FaHandHoldingHeart className="text-3xl mx-auto mb-3" />
            <h4 className="font-bold">Monitor Requests</h4>
            <p className="text-sm opacity-90">Track all donation requests</p>
          </div>
        </div>

        <div className="card bg-linear-to-br from-success to-success/80 text-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="card-body p-6 text-center">
            <FaBangladeshiTakaSign className="text-3xl mx-auto mb-3" />
            <h4 className="font-bold">Funding Overview</h4>
            <p className="text-sm opacity-90">Monitor community funding</p>
          </div>
        </div>

        <div className="card bg-linear-to-br from-warning to-warning/80 text-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="card-body p-6 text-center">
            <FaChartLine className="text-3xl mx-auto mb-3" />
            <h4 className="font-bold">Analytics</h4>
            <p className="text-sm opacity-90">
              View detailed platform analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
