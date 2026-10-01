const API_URL = "http://localhost:5000/api/trainers";

export const getTrainers = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trainers");
  }

  return response.json();
};

export const addTrainer = async (trainer) => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trainer),
  });

  if (!response.ok) {
    throw new Error("Failed to add trainer");
  }

  return response.json();
};

export const updateTrainer = async (id, trainer) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trainer),
  });

  if (!response.ok) {
    throw new Error("Failed to update trainer");
  }

  return response.json();
};

export const deleteTrainer = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete trainer");
  }

  return response.json();
};