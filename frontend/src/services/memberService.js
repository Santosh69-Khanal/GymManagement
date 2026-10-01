const API_URL = "http://localhost:5000/api/members";

// Get all members
export const getMembers = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch members");
  }

  return data;
};


// Add a new member
export const addMember = async (memberData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(memberData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add member");
  }

  return data;
};


// Update a member
export const updateMember = async (id, memberData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(memberData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update member");
  }

  return data;
};


// Delete a member
export const deleteMember = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete member");
  }

  return data;
};