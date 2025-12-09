import { useQuery } from "@tanstack/react-query";
import {
  CiCalendarDate,
  CiHospital1,
  CiLocationOn,
  CiTimer,
} from "react-icons/ci";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";

const DonationRequests = () => {
  const instance = useAxios();

  // Fetch all requests
  const { data: donationRequests = [], isLoading } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await instance.get(`/allRequests?donationStatus=pending`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-secondary mb-10">
        Donation Requests
      </h2>
      {isLoading ? (
        <p className="text-xl font-bold text-center">Data is loading...</p>
      ) : donationRequests.length === 0 ? (
        <p className="text-xl font-bold text-center">
          No pending request available!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {donationRequests.map((request) => (
            <div
              key={request._id}
              className="p-3 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-300 flex flex-col gap-2 border-2 border-secondary"
            >
              <div className="flex justify-end">
                <div className="px-5 py-1 rounded-full bg-secondary text-white font-extrabold text-2xl flex justify-center items-center">
                  {request.bloodGroup}
                </div>
              </div>
              <h2 className="text-xl font-bold">{request.recipientName}</h2>
              <div className="flex items-center gap-1">
                <CiLocationOn className="text-xl font-bold" />
                <p>
                  {request.recipientDivision}, {request.recipientDistrict},{" "}
                  {request.recipientUpazila}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <CiLocationOn className="text-xl font-bold" />
                <p>{request.fullAddressLine}</p>
              </div>
              <div className="flex items-center gap-1">
                <CiCalendarDate className="text-xl font-bold" />
                <p>{request.donationDate}</p>
              </div>
              <div className="flex items-center gap-1">
                <CiTimer className="text-xl font-bold" />
                <p>{request.donationTime}</p>
              </div>
              <div className="flex items-center gap-1">
                <CiHospital1 className="text-xl font-bold" />
                <p>{request.hospitalName}</p>
              </div>
              <Link
                to={`/viewDonationRequest/${request._id}`}
                className="btn btn-secondary"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
