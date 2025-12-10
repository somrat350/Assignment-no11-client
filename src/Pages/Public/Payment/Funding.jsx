import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const Funding = () => {
  const { user, userLoading } = useAuth();
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100);
  const instance = useAxios();
  const funding = [];

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
          <div className="flex items-center gap-2 text-xl text-secondary font-bold">
            <TbCurrencyTaka />
            <span className="">100</span>
          </div>
        </div>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => document.getElementById("paymentModal").showModal()}
        >
          Give Fund
        </button>
      </div>
      <div className="flex gap-3 items-center mt-5">
        <span>Sort by:</span>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          defaultValue={sortBy}
          className="select w-28"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
      <div className="overflow-x-auto mt-5">
        {userLoading || loading ? (
          "Loading..."
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-gray-700">
                <th>#</th>
                <th>User</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {funding.map((fund, i) => (
                <tr key={fund._id}>
                  <td>{i + 1}</td>
                  <td>{fund.name}</td>
                  <td>{fund.amount}</td>
                  <td>{fund.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-10">
        <h2 className="text-xl">Top Donors</h2>
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
