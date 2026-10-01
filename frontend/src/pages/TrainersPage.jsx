import { useEffect, useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import {
  getTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer,
} from "../services/trainerService";

function TrainersPage() {
  const [trainers, setTrainers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience_years: "",
    status: "active",
  });

  // ==========================================
  // LOAD TRAINERS
  // ==========================================

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTrainers();

      setTrainers(data.trainers || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const openAddForm = () => {
    setEditingTrainer(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience_years: "",
      status: "active",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const openEditForm = (trainer) => {
    setEditingTrainer(trainer);

    setFormData({
      name: trainer.name || "",
      email: trainer.email || "",
      phone: trainer.phone || "",
      specialization: trainer.specialization || "",
      experience_years: trainer.experience_years || "",
      status: trainer.status || "active",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.email) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);

      const trainerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialization: formData.specialization,
        experience_years: formData.experience_years
          ? Number(formData.experience_years)
          : 0,
        status: formData.status,
      };

      if (editingTrainer) {
        await updateTrainer(editingTrainer.id, trainerData);

        setSuccess("Trainer updated successfully.");
      } else {
        await addTrainer(trainerData);

        setSuccess("Trainer added successfully.");
      }

      setShowForm(false);
      setEditingTrainer(null);

      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience_years: "",
        status: "active",
      });

      await fetchTrainers();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE TRAINER
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteTrainer(id);

      setSuccess("Trainer deleted successfully.");

      await fetchTrainers();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#E2DECE] flex">

      <DashboardSidebar />

      <div className="flex-1 min-w-0">

        <DashboardNavbar />

        <main className="p-6 md:p-10">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                Management
              </p>

              <h1 className="text-4xl font-black text-[#2E2C26]">
                Trainers
              </h1>

              <p className="text-[#3D4F5A]/50 mt-2 text-sm">
                Manage gym trainers and their information.
              </p>

            </div>

            <button
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                  setEditingTrainer(null);
                } else {
                  openAddForm();
                }
              }}
              className="bg-[#73795D] text-[#E2DECE] px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#3D4F5A] transition"
            >
              {showForm ? "Close" : "+ Add Trainer"}
            </button>

          </div>


          {/* SUCCESS */}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-[#73795D]/10 border border-[#73795D]/20 text-[#73795D] text-sm font-medium">
              {success}
            </div>
          )}


          {/* ERROR */}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>
          )}


          {/* FORM */}

          {showForm && (
            <div className="mb-8 bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl p-6 md:p-8">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                {editingTrainer ? "Edit Trainer" : "New Trainer"}
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1 mb-6">
                {editingTrainer ? "Update Trainer" : "Add Trainer"}
              </h2>


              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >

                {/* NAME */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Trainer name"
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="trainer@gmail.com"
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  />

                </div>


                {/* PHONE */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  />

                </div>


                {/* SPECIALIZATION */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Specialization
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Strength Training"
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  />

                </div>


                {/* EXPERIENCE */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Experience (Years)
                  </label>

                  <input
                    type="number"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    min="0"
                    placeholder="3"
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  />

                </div>


                {/* STATUS */}

                <div>

                  <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                  >

                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>

                  </select>

                </div>


                {/* BUTTONS */}

                <div className="md:col-span-2 flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTrainer(null);
                    }}
                    className="px-6 py-3 rounded-xl text-sm font-bold text-[#3D4F5A] border border-[#3D4F5A]/15 hover:bg-[#3D4F5A]/5 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#2E2C26] text-[#E2DECE] px-7 py-3 rounded-xl text-sm font-bold hover:bg-[#73795D] transition disabled:opacity-50"
                  >
                    {saving
                      ? "Saving..."
                      : editingTrainer
                      ? "Update Trainer"
                      : "Add Trainer"}
                  </button>

                </div>

              </form>

            </div>
          )}


          {/* TRAINER LIST */}

          <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

            <div className="p-6 md:p-7 border-b border-[#3D4F5A]/10">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                Team
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                All Trainers
              </h2>

            </div>


            {loading ? (

              <div className="py-20 text-center text-[#3D4F5A]/50">
                Loading trainers...
              </div>

            ) : trainers.length === 0 ? (

              <div className="py-20 text-center">

                <p className="text-[#2E2C26] font-bold">
                  No trainers yet
                </p>

                <p className="text-[#3D4F5A]/45 text-sm mt-2">
                  Add your first trainer to get started.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-[#3D4F5A]/10">

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Trainer
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Phone
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Specialization
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Experience
                      </th>

                      <th className="text-left px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Status
                      </th>

                      <th className="text-right px-6 py-4 text-xs text-[#3D4F5A]/40">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {trainers.map((trainer) => (

                      <tr
                        key={trainer.id}
                        className="border-b border-[#3D4F5A]/10 hover:bg-[#3D4F5A]/5 transition"
                      >

                        <td className="px-6 py-5">

                          <p className="font-bold text-sm text-[#2E2C26]">
                            {trainer.name}
                          </p>

                          <p className="text-xs text-[#3D4F5A]/40">
                            {trainer.email}
                          </p>

                        </td>


                        <td className="px-6 py-5 text-sm text-[#2E2C26]">
                          {trainer.phone || "—"}
                        </td>


                        <td className="px-6 py-5">

                          <span className="text-sm text-[#73795D] font-bold">
                            {trainer.specialization || "General"}
                          </span>

                        </td>


                        <td className="px-6 py-5 text-sm text-[#2E2C26]">
                          {trainer.experience_years || 0} years
                        </td>


                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                              trainer.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {trainer.status || "inactive"}
                          </span>

                        </td>


                        <td className="px-6 py-5">

                          <div className="flex justify-end gap-2">

                            <button
                              onClick={() => openEditForm(trainer)}
                              className="px-4 py-2 rounded-lg text-xs font-bold text-[#3D4F5A] border border-[#3D4F5A]/15 hover:bg-[#3D4F5A]/10 transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(trainer.id)}
                              className="px-4 py-2 rounded-lg text-xs font-bold text-red-600 border border-red-500/20 hover:bg-red-500/10 transition"
                            >
                              Delete
                            </button>

                          </div>

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

export default TrainersPage;