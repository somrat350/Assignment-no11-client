import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TopDonorPieChart from "../../../Components/Public/Funding/TopDonorPieChart";

const Funding = () => {
  const { user, userLoading } = useAuth();
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100);
  const instance = useAxios();
  const instanceSecure = useAxiosSecure();

  // Fetch funding by this user
  const { data: funding = [], isLoading } = useQuery({
    queryKey: ["funding", user?.email, sortBy],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/funding?email=${user?.email}&sortBy=${sortBy}`
      );
      return res.data;
    },
  });

  // Fetch funding by this user
  const { data: topFunder = [] } = useQuery({
    queryKey: ["topFunder", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instance.get(`/topFunder`);
      return res.data;
    },
  });

  let totalAmount = 0;
  if (funding.length > 0) {
    totalAmount = funding.reduce((sum, fund) => sum + fund.amount, 0);
  }

  const handlePayment = async (e) => {
    setLoading(true);
    e.preventDefault();
    const paymentInfo = {
      email: user.email,
      amount,
    };

    const res = await instance.post(
      `/createCheckoutSession?email=${user.email}`,
      paymentInfo
    );
    setLoading(false);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
  };
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-5">Funding</h2>
      <div className="flex items-center justify-end gap-5">
        <div className="flex flex-col items-end">
          <span className="text-sm">Given by you</span>
          <span className="text-xl text-secondary font-bold">
            {totalAmount} BDT
          </span>
        </div>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => document.getElementById("paymentModal").showModal()}
        >
          Give Fund
        </button>
      </div>
      <div className="flex justify-between items-center gap-3 mt-5">
        <div className="flex gap-3 items-center">
          <span>Sort by:</span>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            defaultValue={sortBy}
            className="select w-24"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <span className="text-sm sm:text-base">Showing 5 records</span>
      </div>
      <div className="overflow-x-auto mt-5">
        {userLoading || loading || isLoading ? (
          "Loading..."
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-gray-700">
                <th className="hidden sm:table-cell">#</th>
                <th className="hidden sm:table-cell">User</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {funding.map((fund, i) => (
                <tr key={fund._id}>
                  <td className="hidden sm:table-cell">{i + 1}</td>
                  <td className="hidden sm:table-cell">{fund.name}</td>
                  <td className="text-secondary font-bold">{fund.amount}</td>
                  <td>{fund.date}</td>
                  <td>
                    <a
                      href={`${
                        import.meta.env.VITE_SERVER_LINK
                      }/generateReceipt?id=${fund._id}`}
                      target="_blank"
                      className="btn btn-secondary btn-sm"
                    >
                      Download{" "}
                      <span className="hidden sm:flex">Receipt (PDF)</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 mt-5">
        <span className="text-secondary font-bold">Page 1 of 3</span>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline btn-secondary btn-sm">Prev</button>
          <button className="btn btn-outline btn-secondary btn-sm">Next</button>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-2xl font-bold">Top 5 Funder</h2>
        {topFunder.length > 0 ? (
          <TopDonorPieChart topFunder={topFunder} />
        ) : (
          "not found"
        )}
      </div>
      <dialog id="paymentModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold text-lg">Give Fund</h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => document.getElementById("paymentModal").close()}
            >
              <FaXmark className="text-lg font-bold" />
            </button>
          </div>
          <p className="mt-1 mb-5">Support the organization.</p>
          <form onSubmit={handlePayment} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="flex">
                Amount (BDT)
                <sup className="text-[8px] text-red-400">
                  <FaStar />
                </sup>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="input w-full pr-8"
                />
                <button
                  onClick={() => setAmount(amount + 100)}
                  type="button"
                  className="btn btn-secondary"
                >
                  + 100
                </button>
              </div>
            </div>
            <button className="btn btn-secondary">Make Payment</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Funding;
