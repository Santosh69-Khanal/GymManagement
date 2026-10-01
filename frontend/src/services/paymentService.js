const API_URL = "http://localhost:5000/api/payments";


// ==========================================
// GET PAYMENTS
// ==========================================

export const getPayments = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch payments"
    );
  }

  return data;
};


// ==========================================
// ADD PAYMENT
// ==========================================

export const addPayment = async (paymentData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add payment"
    );
  }

  return data;
};


// ==========================================
// DELETE PAYMENT
// ==========================================

export const deletePayment = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete payment"
    );
  }

  return data;
};