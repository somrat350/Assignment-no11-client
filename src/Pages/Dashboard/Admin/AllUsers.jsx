import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const AllUsers = () => {
  const { user, userLoading } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [filterBy, setFilterBy] = useState("all");

  // Fetch all users
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["all-users", user?.email, filterBy],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/allUsers?email=${user?.email}&status=${filterBy}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-3xl font-bold">All Users</h2>
      <div className="p-2 sm:p-5">
        <div className="mt-2 flex justify-end">
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            defaultValue="all"
            className="select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <div className="overflow-x-auto mt-10">
          {userLoading || isLoading ? (
            "Loading..."
          ) : (
            <table className="table w-full">
              <thead>
                <tr className="font-semibold text-gray-700">
                  <th>#</th>
                  <th>Image</th>
                  <th>Name & Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {allUsers.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={user.photoURL}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>
                      {user.name}
                      <br /> {user.email}
                    </td>
                    <td>{user.role}</td>

                    {/* Status */}
                    <td
                      className={`font-bold ${
                        user.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.status}
                    </td>

                    {/* Action Buttons */}
                    <td className="flex flex-col gap-2">
                      <div className="dropdown dropdown-left dropdown-center">
                        <div tabIndex={0} role="button" className="btn m-1">
                          <BsThreeDotsVertical className="text-xl" />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-1"
                        >
                          {user.status === "active" ? (
                            <button className="btn btn-sm btn-secondary text-white">
                              Blocked
                            </button>
                          ) : (
                            <button className="btn btn-sm btn-success text-white">
                              Active
                            </button>
                          )}
                          {user.role !== "donor" && (
                            <button className="btn btn-sm btn-info text-white">
                              Make Donor
                            </button>
                          )}
                          {user.role !== "volunteer" && (
                            <button className="btn btn-sm btn-info text-white">
                              Make Volunteer
                            </button>
                          )}
                          {user.role !== "admin" && (
                            <button className="btn btn-sm btn-info text-white">
                              Make Admin
                            </button>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
