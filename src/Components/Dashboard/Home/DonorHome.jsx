import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaCalendarAlt, FaClock, FaTint, FaMapMarkerAlt, FaEye, FaEdit, FaTrash, FaCheck, FaTimes, FaPlus, FaChartLine, FaAward, FaHandHoldingHeart } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import Swal from "sweetalert2";
import { useState } from "react";
import Loading from "../../Loading";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

const DonorHome = () => {
  const { user, userLoading } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // Fetch recent 3 donation requests created by this donor
  const {
    data: recentRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["recent-donation-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/recentDonationRequests?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Fetch donor statistics for charts
  const { data: donorStats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["donor-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      // Mock data for demonstration - replace with actual API call
      return {
        totalRequests: recentRequests.length || 0,
        completedDonations: recentRequests.filter(req => req.donationStatus === 'done').length || 0,
        pendingRequests: recentRequests.filter(req => req.donationStatus === 'pending').length || 0,
        inProgressRequests: recentRequests.filter(req => req.donationStatus === 'inprogress').length || 0,
        canceledRequests: recentRequests.filter(req => req.donationStatus === 'canceled').length || 0,
        monthlyData: [
          { month: 'Jan', requests: 2, completed: 1 },
          { month: 'Feb', requests: 3, completed: 2 },
          { month: 'Mar', requests: 1, completed: 1 },
          { month: 'Apr', requests: 4, completed: 3 },
          { month: 'May', requests: 2, completed: 2 },
          { month: 'Jun', requests: 3, completed: 2 }
        ]
      };
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        instanceSecure
          .delete(`/deleteRequest/${id}?email=${user?.email}`)
          .then((res) => {
            setLoading(false);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleStatusUpdate = (id, donationStatus) => {
    const updatedInfo = { donationStatus };
    if (donationStatus === "canceled") {
      updatedInfo.donorEmail = null;
      updatedInfo.donorName = null;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${donationStatus} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        instanceSecure
          .put(`/updateRequest/${id}?email=${user?.email}`, updatedInfo)
          .then((res) => {
            setLoading(false);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: donationStatus === "canceled" ? "Canceled!" : "Done!",
                text: `Your request has been ${donationStatus}.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  if (userLoading || isLoading || loading || statsLoading) return <Loading />;

  // Chart data
  const statusData = [
    { name: 'Completed', value: donorStats.completedDonations, color: '#10b981' },
    { name: 'Pending', value: donorStats.pendingRequests, color: '#f59e0b' },
    { name: 'In Progress', value: donorStats.inProgressRequests, color: '#3b82f6' },
    { name: 'Canceled', value: donorStats.canceledRequests, color: '#ef4444' }
  ];

  const impactStats = [
    {
      title: "Total Requests",
      value: donorStats.totalRequests,
      icon: <FaHandHoldingHeart />,
      color: "from-secondary to-secondary/80",
      change: "+12%"
    },
    {
      title: "Lives Saved",
      value: donorStats.completedDonations * 3, // Each donation can save up to 3 lives
      icon: <FaHeart />,
      color: "from-success to-success/80",
      change: "+25%"
    },
    {
      title: "Success Rate",
      value: donorStats.totalRequests > 0 ? Math.round((donorStats.completedDonations / donorStats.totalRequests) * 100) : 0,
      icon: <FaAward />,
      color: "from-warning to-warning/80",
      suffix: "%",
      change: "+8%"
    },
    {
      title: "Active Requests",
      value: donorStats.pendingRequests + donorStats.inProgressRequests,
      icon: <FaChartLine />,
      color: "from-info to-info/80",
      change: "+3%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Impact Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="card-body p-6 relative overflow-hidden">
              {/* Background Pattern */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-xl`}></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-base-100 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-xs text-success font-semibold">
                  {stat.change}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-base-content mb-1">
                {stat.value}{stat.suffix || ''}
              </div>
              <div className="text-sm text-base-content/70">
                {stat.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Status Pie Chart */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
              <FaChartLine className="mr-3 text-secondary" />
              Request Status Overview
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
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

        {/* Monthly Trends Line Chart */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <h3 className="text-xl font-bold text-base-content mb-4 flex items-center">
              <HiLightningBolt className="mr-3 text-secondary" />
              Monthly Donation Trends
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donorStats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    name="Total Requests"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donation Requests */}
      {recentRequests.length === 0 ? (
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center">
              <FaHeart className="text-3xl text-base-100" />
            </div>
            <h3 className="text-2xl font-bold text-base-content mb-4">
              Ready to Save Lives?
            </h3>
            <p className="text-base-content/70 mb-6 max-w-md mx-auto">
              You don't have any donation requests yet. Create your first request and start making a difference in someone's life.
            </p>
            <Link
              to="/dashboard/newDonationRequest"
              className="btn btn-secondary btn-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaPlus className="mr-2" />
              Create New Donation Request
            </Link>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-base-content flex items-center">
                <FaHandHoldingHeart className="mr-3 text-secondary" />
                Your Recent Donation Requests
              </h3>
              <div className="badge badge-secondary badge-lg">
                {recentRequests.length} Active
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th className="font-bold">#</th>
                    <th className="font-bold">
                      <div className="flex items-center">
                        <FaHeart className="mr-2 text-secondary" />
                        Recipient
                      </div>
                    </th>
                    <th className="font-bold">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-secondary" />
                        Location
                      </div>
                    </th>
                    <th className="font-bold">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-secondary" />
                        Date & Time
                      </div>
                    </th>
                    <th className="font-bold">
                      <div className="flex items-center">
                        <FaTint className="mr-2 text-secondary" />
                        Blood Group
                      </div>
                    </th>
                    <th className="font-bold">Status</th>
                    <th className="font-bold">Donor Info</th>
                    <th className="font-bold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {recentRequests.map((req, i) => (
                    <tr key={req._id} className="hover:bg-base-200/50 transition-colors duration-200">
                      <td className="font-semibold">{i + 1}</td>
                      <td>
                        <div className="font-semibold text-base-content">
                          {req.recipientName}
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          <div className="font-medium">{req.recipientDistrict}</div>
                          <div className="text-base-content/60">{req.recipientUpazila}</div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          <div className="font-medium">{req.donationDate}</div>
                          <div className="text-base-content/60">{req.donationTime}</div>
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-secondary badge-lg font-bold">
                          {req.bloodGroup}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div className={`badge badge-lg font-bold ${
                          req.donationStatus === "pending"
                            ? "badge-warning"
                            : req.donationStatus === "inprogress"
                            ? "badge-info"
                            : req.donationStatus === "done"
                            ? "badge-success"
                            : "badge-error"
                        }`}>
                          {req.donationStatus}
                        </div>
                      </td>

                      {/* Donor Info */}
                      <td>
                        {req.donationStatus === "inprogress" ||
                        req.donationStatus === "done" ? (
                          <div className="text-sm">
                            <div className="font-medium">{req.donorName}</div>
                            <div className="text-base-content/60 text-xs">
                              {req.donorEmail}
                            </div>
                          </div>
                        ) : (
                          <span className="text-base-content/40">-</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td>
                        <div className="dropdown dropdown-left dropdown-center">
                          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                            <BsThreeDotsVertical className="text-lg" />
                          </div>
                          <ul
                            tabIndex="-1"
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl border border-base-300 gap-1"
                          >
                            <li>
                              <Link
                                to={`/dashboard/viewDonationRequest/${req._id}`}
                                className="btn btn-sm btn-info text-base-100 hover:scale-105 transition-transform duration-200"
                              >
                                <FaEye className="mr-2" />
                                View
                              </Link>
                            </li>

                            <li>
                              <Link
                                to={`/dashboard/editDonationRequest/${req._id}`}
                                className="btn btn-sm btn-warning text-base-100 hover:scale-105 transition-transform duration-200"
                              >
                                <FaEdit className="mr-2" />
                                Edit
                              </Link>
                            </li>

                            <li>
                              <button
                                className="btn btn-sm btn-error text-base-100 hover:scale-105 transition-transform duration-200"
                                onClick={() => handleDelete(req._id)}
                              >
                                <FaTrash className="mr-2" />
                                Delete
                              </button>
                            </li>

                            {/* Done & Cancel only if inprogress */}
                            {req.donationStatus === "inprogress" && (
                              <>
                                <li>
                                  <button
                                    className="btn btn-sm btn-success text-base-100 hover:scale-105 transition-transform duration-200"
                                    onClick={() =>
                                      handleStatusUpdate(req._id, "done")
                                    }
                                  >
                                    <FaCheck className="mr-2" />
                                    Done
                                  </button>
                                </li>

                                <li>
                                  <button
                                    className="btn btn-sm btn-neutral text-base-100 hover:scale-105 transition-transform duration-200"
                                    onClick={() =>
                                      handleStatusUpdate(req._id, "canceled")
                                    }
                                  >
                                    <FaTimes className="mr-2" />
                                    Cancel
                                  </button>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View All Button */}
            <div className="text-center mt-6">
              <Link
                to="/dashboard/myDonationRequests"
                className="btn btn-outline btn-secondary btn-lg transform hover:scale-105 transition-all duration-300"
              >
                <FaEye className="mr-2" />
                View All My Requests
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorHome;
