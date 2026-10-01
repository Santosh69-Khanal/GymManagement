const API_URL = "http://localhost:5000/api/memberships";


// =====================================================
// GET ALL MEMBERSHIP PLANS
// =====================================================

export const getPlans = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/plans`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch membership plans"
    );
  }

  return data;
};


// =====================================================
// GET ALL ASSIGNED MEMBERSHIPS
// =====================================================

export const getMemberships = async () => {
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
      data.message || "Failed to fetch memberships"
    );
  }

  return data;
};


// =====================================================
// ASSIGN MEMBERSHIP
// =====================================================

export const assignMembership = async (membershipData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(membershipData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to assign membership"
    );
  }

  return data;
};


// =====================================================
// DELETE ASSIGNED MEMBERSHIP
// =====================================================

export const deleteMembership = async (id) => {
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
      data.message || "Failed to delete membership"
    );
  }

  return data;
};