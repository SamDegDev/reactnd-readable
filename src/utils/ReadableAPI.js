const API_ROOT = 'http://localhost:3001';

// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

/**
 * CATEGORIES
 */

// Fetches all categories available
export const fetchAllCategories = () =>
  fetch(`${API_ROOT}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/**
 * POSTS
 */

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

// Add a new post
export const createPost = data => {
  return fetch(`${API_ROOT}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .then(data => data);
}

// Delete a post by its ID
export const deletePostById = postId => {
  return fetch(`${API_ROOT}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  })
    .then(res => res.text())
}

// Edit a post by its ID
export const editPostById = (postId, data) => {
  return fetch(`${API_ROOT}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .then(data => data);
}

// Vote a post
export const votePostById = (postId, data) => {
  return fetch(`${API_ROOT}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .then(data => data);
}

/**
 * COMMENTS
 */

// Fetches all the comments for a single post
export const fetchCommentsWithPost = postId =>
fetch(`${API_ROOT}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
  .then(data => data);

// Add a new comment to a post
export const createComment = data => {
  return fetch(`${API_ROOT}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .then(data => data);
}

// Fetches the details for a single comment
export const fetchCommentById = commentId =>
fetch(`${API_ROOT}/comments/${commentId}`, { headers })
  .then(res => res.json())
  .then(data => data);

// Edit an existing comment by its ID
export const editCommentById = (commentId, data) => {
  return fetch(`${API_ROOT}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .then(data => data);
}

// Delete a comment by its ID
export const deleteCommentById = commentId => {
  return fetch(`${API_ROOT}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  })
    .then(res => res.text())
}

// Vote a comment
export const voteCommentById = (commentId, data) => {
  return fetch(`${API_ROOT}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .then(data => data);
}