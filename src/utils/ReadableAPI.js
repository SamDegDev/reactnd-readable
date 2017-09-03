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
export const fetchPostsWithCategory = categoryId =>
  fetch(`${API_ROOT}/${categoryId}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

// Fetches a post by its id
export const fetchPostById = postId =>
  fetch(`${API_ROOT}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data);

// Fetches all the comments for a single post
export const fetchCommentsWithPost = postId =>
  fetch(`${API_ROOT}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

// Fetches the details for a single comment
export const fetchCommentById = commentId =>
  fetch(`${API_ROOT}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data);

// Add a new post
export const createPost = data =>
  fetch(`${API_ROOT}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  })
    .then(res => res.json())
    .then(data => data);