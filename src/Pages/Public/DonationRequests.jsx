import { useQuery } from "@tanstack/react-query";
import {
  CiCalendarDate,
  CiHospital1,
  CiLocationOn,
  CiTimer,
} from "react-icons/ci";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import SkeletonLoader from "../../Components/Common/SkeletonLoader";

const DonationRequests = () => {
  const instance = useAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("newest");
  const [group, setGroup] = useState("");
  const limit = 8;

  const {
    data: donationRequestsData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donationRequests", currentPage, searchTerm, sort, group],
    queryFn: async () => {
      const res = await instance.get(
        `/allRequests?donationStatus=pending&limit=${limit}&skip=${
          currentPage * limit
        }&searchTerm=${searchTerm}&sort=${sort}&group=${group}`
      );
      return res.data;
    },
  });

  const donationRequests = donationRequestsData.result || [];
  const totalPages = Math.ceil((donationRequestsData.total || 0) / limit);

  const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="px-5 py-10 w-full max-w-360 mx-auto">
      <title>All Donation Requests | BloodLine</title>
      <h2 className="text-3xl font-bold text-center text-secondary mb-10">
        Donation Requests
      </h2>

      <div className="mb-10">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center my-5 gap-3">
          <div className="flex items-center gap-2">
            <select
              value={group || "Pick a group"}
              onChange={(e) => setGroup(e.target.value)}
              className="select cursor-pointer min-w-32 border-secondary outline-secondary rounded-full"
            >
              <option value="Pick a group" disabled={true}>
                Pick a group
              </option>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              defaultValue="Newest"
              onChange={(e) => setSort(e.target.value)}
              className="select cursor-pointer min-w-32 border-secondary outline-secondary rounded-full"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <label className="input border-secondary outline-secondary rounded-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search by hospital name or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </label>
        </div>
        {(group || searchTerm) && (
          <div className="text-sm text-gray-600">
            <span>Filters applied:</span>
            {group && <span className="ml-2 font-semibold">{group}</span>}
            {searchTerm && (
              <span className="ml-2 font-semibold">Search: {searchTerm}</span>
            )}
            <button
              className="ml-2 text-red-500 hover:text-red-700 cursor-pointer font-medium"
              onClick={() => {
                setGroup("");
                setSearchTerm("");
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="text-center py-12">
          <div className="text-6xl text-red-300 mb-4">⚠️</div>
          <p className="text-xl font-bold text-red-500 mb-2">
            Error loading donation requests
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {error.message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary btn-sm rounded-full"
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <SkeletonLoader type="cards-only" count={limit} />
      ) : donationRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">🔍</div>
          <p className="text-xl font-bold text-gray-500 mb-2">
            No pending requests available!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {donationRequests.map((request, index) => (
            <div
              key={request._id}
              className="group p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-500 flex flex-col gap-3 border-2 border-secondary/20 hover:border-secondary bg-base-200 transform transition-all"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Blood Group Badge */}
              <div className="flex justify-end">
                <div className="px-4 py-2 rounded-full bg-linear-to-r from-secondary to-secondary/80 text-white font-extrabold text-xl flex justify-center items-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {request.bloodGroup}
                </div>
              </div>

              {/* Recipient Name */}
              <h2 className="text-xl font-bold group-hover:text-secondary transition-colors duration-300">
                {request.recipientName}
              </h2>

              {/* Location Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CiLocationOn className="text-xl font-bold text-secondary shrink-0" />
                  <p className="text-sm">
                    {request.recipientDivision}, {request.recipientDistrict},{" "}
                    {request.recipientUpazila}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CiLocationOn className="text-xl font-bold text-secondary shrink-0" />
                  <p className="text-sm line-clamp-2">
                    {request.fullAddressLine}
                  </p>
                </div>
              </div>

              {/* Date and Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CiCalendarDate className="text-xl font-bold text-secondary" />
                  <p className="text-sm font-medium">{request.donationDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CiTimer className="text-xl font-bold text-secondary" />
                  <p className="text-sm">{request.donationTime}</p>
                </div>
              </div>

              {/* Hospital */}
              <div className="flex items-center gap-2">
                <CiHospital1 className="text-xl font-bold text-secondary" />
                <p className="text-sm font-medium line-clamp-1">
                  {request.hospitalName}
                </p>
              </div>

              {/* View Details Button */}
              <Link
                to={`/viewDonationRequest/${request._id}`}
                className="btn btn-secondary rounded-full mt-auto group-hover:bg-secondary group-hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-base-100 rounded-2xl shadow-lg border border-secondary/10">
          <div className="text-secondary font-bold text-center sm:text-left">
            Page {currentPage + 1} of {totalPages}
            <span className="text-sm text-gray-500 block sm:inline sm:ml-2">
              ({donationRequestsData.total || 0} total results)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className="btn btn-outline btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="btn btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              Prev
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`btn btn-sm rounded-full w-10 h-10 ${
                      currentPage === pageNum
                        ? "btn-secondary"
                        : "btn-outline btn-secondary"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
              className="btn btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage + 1 >= totalPages}
              className="btn btn-outline btn-secondary btn-sm rounded-full disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
