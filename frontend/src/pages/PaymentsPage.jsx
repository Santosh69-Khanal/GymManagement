import { useEffect, useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import {
  getPayments,
  addPayment,
  deletePayment,
} from "../services/paymentService";

import { getMembers } from "../services/memberService";
import { getMemberships } from "../services/membershipService";


function PaymentsPage() {

  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    member_id: "",
    membership_id: "",
    amount: "",
    payment_method: "cash",
  });


  // ==========================================
  // LOAD EVERYTHING
  // ==========================================

  const fetchData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        paymentData,
        memberData,
        membershipData,
      ] = await Promise.all([
        getPayments(),
        getMembers(),
        getMemberships(),
      ]);

      setPayments(
        paymentData.payments || []
      );

      setMembers(
        memberData.members || []
      );

      setMemberships(
        membershipData.memberships || []
      );

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  // ==========================================
  // SELECT MEMBER
  // ==========================================

  const handleMemberChange = (e) => {

    const memberId = e.target.value;

    setFormData({
      member_id: memberId,
      membership_id: "",
      amount: "",
      payment_method: "cash",
    });

    setError("");
  };


  // ==========================================
  // SELECT MEMBERSHIP
  // ==========================================

  const handleMembershipChange = (e) => {

    const membershipId = e.target.value;

    const selectedMembership =
      memberships.find(
        (membership) =>
          Number(membership.id) ===
          Number(membershipId)
      );

    setFormData((previous) => ({
      ...previous,

      membership_id: membershipId,

      amount: selectedMembership
        ? selectedMembership.price
        : "",
    }));
  };


  // ==========================================
  // PAYMENT METHOD
  // ==========================================

  const handlePaymentMethodChange = (e) => {

    setFormData((previous) => ({
      ...previous,
      payment_method: e.target.value,
    }));

  };


  // ==========================================
  // SUBMIT PAYMENT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (!formData.member_id) {

      setError("Please select a member.");
      return;

    }


    if (!formData.membership_id) {

      setError("Please select a membership.");
      return;

    }


    if (!formData.amount) {

      setError("Please enter an amount.");
      return;

    }


    try {

      setSaving(true);


      await addPayment({

        member_id:
          Number(formData.member_id),

        membership_id:
          Number(formData.membership_id),

        amount:
          Number(formData.amount),

        payment_method:
          formData.payment_method,

      });


      setSuccess(
        "Payment recorded successfully!"
      );


      setFormData({
        member_id: "",
        membership_id: "",
        amount: "",
        payment_method: "cash",
      });


      setShowForm(false);


      await fetchData();


    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setSaving(false);

    }

  };


  // ==========================================
  // DELETE PAYMENT
  // ==========================================

  const handleDeletePayment = async (paymentId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmed) {
      return;
    }


    try {

      setError("");
      setSuccess("");


      await deletePayment(paymentId);


      setSuccess(
        "Payment deleted successfully!"
      );


      await fetchData();


    } catch (error) {

      console.error(error);
      setError(error.message);

    }

  };


  // ==========================================
  // MEMBERSHIPS FOR SELECTED MEMBER
  // ==========================================

  const selectedMemberMemberships =
    memberships.filter(
      (membership) =>
        Number(membership.member_id) ===
        Number(formData.member_id)
    );


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalRevenue =
    payments.reduce(
      (total, payment) =>
        total +
        Number(payment.amount || 0),
      0
    );


  const paidPayments =
    payments.filter(
      (payment) =>
        payment.status === "paid"
    ).length;


  const pendingPayments =
    payments.filter(
      (payment) =>
        payment.status === "pending"
    ).length;


  return (

    <div className="min-h-screen bg-[#E2DECE] flex">

      {/* SIDEBAR */}

      <DashboardSidebar />


      {/* MAIN */}

      <div className="flex-1 min-w-0">

        <DashboardNavbar />


        <main className="p-6 md:p-10">


          {/* ====================================== */}
          {/* HEADER */}
          {/* ====================================== */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                Management
              </p>

              <h1 className="text-4xl font-black text-[#2E2C26]">
                Payments
              </h1>

              <p className="text-[#3D4F5A]/50 mt-2 text-sm">
                Track member payments and gym revenue.
              </p>

            </div>


            <button
              onClick={() => {

                setShowForm(!showForm);

                setError("");
                setSuccess("");

              }}
              className="bg-[#73795D] text-[#E2DECE] px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#3D4F5A] transition"
            >

              {showForm
                ? "Close"
                : "+ Record Payment"}

            </button>

          </div>


          {/* ====================================== */}
          {/* SUCCESS */}
          {/* ====================================== */}

          {success && (

            <div className="mb-6 p-4 rounded-xl bg-[#73795D]/10 border border-[#73795D]/20 text-[#73795D] text-sm font-medium">

              {success}

            </div>

          )}


          {/* ====================================== */}
          {/* ERROR */}
          {/* ====================================== */}

          {error && (

            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">

              {error}

            </div>

          )}


          {/* ====================================== */}
          {/* PAYMENT FORM */}
          {/* ====================================== */}

          {showForm && (

            <div className="mb-8 bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl p-6 md:p-8">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                New Transaction
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1 mb-6">
                Record Payment
              </h2>


              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >


                {/* MEMBER */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Member
                  </label>

                  <select
                    value={formData.member_id}
                    onChange={handleMemberChange}
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  >

                    <option value="">
                      Select member
                    </option>


                    {members.map((member) => (

                      <option
                        key={member.id}
                        value={member.id}
                      >

                        {member.name}

                      </option>

                    ))}

                  </select>

                </div>


                {/* MEMBERSHIP */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Membership
                  </label>

                  <select
                    value={formData.membership_id}
                    onChange={handleMembershipChange}
                    disabled={!formData.member_id}
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D] disabled:opacity-50"
                  >

                    <option value="">

                      {!formData.member_id
                        ? "Select member first"
                        : selectedMemberMemberships.length === 0
                        ? "No membership assigned"
                        : "Select membership"}

                    </option>


                    {selectedMemberMemberships.map(
                      (membership) => (

                        <option
                          key={membership.id}
                          value={membership.id}
                        >

                          {membership.plan_name} — Rs.{" "}
                          {Number(
                            membership.price
                          ).toLocaleString()}

                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* AMOUNT */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Amount
                  </label>

                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          amount:
                            e.target.value,
                        })
                      )
                    }
                    min="0"
                    step="0.01"
                    placeholder="Amount"
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  />

                  <p className="text-[11px] text-[#3D4F5A]/40 mt-1">
                    Automatically filled from the selected plan.
                  </p>

                </div>


                {/* PAYMENT METHOD */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Payment Method
                  </label>

                  <select
                    value={formData.payment_method}
                    onChange={handlePaymentMethodChange}
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  >

                    <option value="cash">
                      Cash
                    </option>

                    <option value="card">
                      Card
                    </option>

                    <option value="bank">
                      Bank Transfer
                    </option>

                    <option value="esewa">
                      eSewa
                    </option>

                    <option value="khalti">
                      Khalti
                    </option>

                  </select>

                </div>


                {/* BUTTON */}

                <div className="md:col-span-2 flex justify-end">

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#2E2C26] text-[#E2DECE] px-7 py-3.5 rounded-xl text-sm font-bold hover:bg-[#73795D] transition disabled:opacity-50"
                  >

                    {saving
                      ? "Recording..."
                      : "Record Payment"}

                  </button>

                </div>

              </form>

            </div>

          )}


          {/* ====================================== */}
          {/* STATS */}
          {/* ====================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">


            <div className="bg-[#2E2C26] rounded-2xl p-6">

              <p className="text-[#E2DECE]/45 text-[10px] uppercase tracking-widest font-bold">
                Total Revenue
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">

                {loading
                  ? "..."
                  : `Rs. ${totalRevenue.toLocaleString()}`}

              </h2>

            </div>


            <div className="bg-[#73795D] rounded-2xl p-6">

              <p className="text-[#E2DECE]/70 text-[10px] uppercase tracking-widest font-bold">
                Paid
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">

                {loading
                  ? "..."
                  : paidPayments}

              </h2>

            </div>


            <div className="bg-[#3D4F5A] rounded-2xl p-6">

              <p className="text-[#E2DECE]/55 text-[10px] uppercase tracking-widest font-bold">
                Pending
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">

                {loading
                  ? "..."
                  : pendingPayments}

              </h2>

            </div>

          </div>


          {/* ====================================== */}
          {/* PAYMENT HISTORY */}
          {/* ====================================== */}

          <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">


            <div className="p-6 md:p-7 border-b border-[#3D4F5A]/10">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                Transactions
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Payment History
              </h2>

            </div>


            {loading ? (

              <div className="py-20 text-center">
                Loading payments...
              </div>

            ) : payments.length === 0 ? (

              <div className="py-20 text-center">

                <p className="text-[#2E2C26] font-bold">
                  No payments yet
                </p>

                <p className="text-[#3D4F5A]/45 text-sm mt-2">
                  Record your first payment to get started.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-[#3D4F5A]/10">

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Member
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Plan
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Amount
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Date
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Method
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Status
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {payments.map((payment) => (

                      <tr
                        key={payment.id}
                        className="border-b border-[#3D4F5A]/10 last:border-b-0"
                      >


                        {/* MEMBER */}

                        <td className="px-6 py-5">

                          <p className="font-bold text-sm text-[#2E2C26]">
                            {payment.member_name}
                          </p>

                          <p className="text-xs text-[#3D4F5A]/40">
                            {payment.member_email}
                          </p>

                        </td>


                        {/* PLAN */}

                        <td className="px-6 py-5">

                          <span className="text-sm text-[#73795D] font-bold">
                            {payment.plan_name || "No plan"}
                          </span>

                        </td>


                        {/* AMOUNT */}

                        <td className="px-6 py-5">

                          <span className="font-bold text-sm">
                            Rs.{" "}
                            {Number(
                              payment.amount
                            ).toLocaleString()}
                          </span>

                        </td>


                        {/* DATE */}

                        <td className="px-6 py-5 text-sm">
                          {payment.payment_date}
                        </td>


                        {/* METHOD */}

                        <td className="px-6 py-5 text-sm capitalize">
                          {payment.payment_method ||
                            "Not specified"}
                        </td>


                        {/* STATUS */}

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                              payment.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >

                            {payment.status ||
                              "pending"}

                          </span>

                        </td>


                        {/* DELETE */}

                        <td className="px-6 py-5">

                          <button
                            onClick={() =>
                              handleDeletePayment(
                                payment.id
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-red-500/10 text-red-600 text-xs font-bold hover:bg-red-500 hover:text-white transition"
                          >

                            Delete

                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>


        </main>

      </div>

    </div>

  );

}

export default PaymentsPage;