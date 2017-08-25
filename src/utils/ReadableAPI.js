const API_ROOT = 'http://localhost:5001';

// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

// Fetches all categories available
export const fetchAllCategories = () =>
  fetch(`${API_ROOT}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

// Fetches all of the posts
export const fetchAllPosts = () =>
  fetch(`${API_ROOT}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

// Fetches all of the posts for a particular category
export const fetchPostsWithCategory = category =>
  fetch(`${API_ROOT}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

// Fetches a post by its id
export const fetchPostById = id => 
  fetch(`${API_ROOT}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);