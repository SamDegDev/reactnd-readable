const API_ROOT = 'http://localhost:5001';

// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

// Fetches all Categories from the server
export const getCategories = () =>
  fetch(`${API_ROOT}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)