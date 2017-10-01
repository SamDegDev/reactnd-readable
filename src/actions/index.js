import * as ReadableAPI from '../utils/ReadableAPI';

// Categories
export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES';
export const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
// Posts
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POSTS_WITH_CATEGORY = 'RECEIVE_POSTS_WITH_CATEGORY';
export const CHANGE_POSTS_SORTING = 'CHANGE_POSTS_SORTING';
export const RECEIVE_POST_BY_ID = 'RECEIVE_POST_BY_ID';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const CLEAR_SELECTED_POST = 'CLEAR_SELECTED_POST';
export const EDIT_POST = 'EDIT_POST';
// Comments
export const RECEIVE_ALL_COMMENTS_WITH_POST = 'RECEIVE_ALL_COMMENTS_WITH_POST';
export const CHANGE_COMMENTS_SORTING = 'CHANGE_COMMENTS_SORTING';
export const RECEIVE_COMMENT_BY_ID = 'RECEIVE_COMMENT_BY_ID';

export const receiveAllCategories = categories => ({ type: RECEIVE_ALL_CATEGORIES, categories });
export const fetchAllCategories = () => dispatch => {
	ReadableAPI
		.fetchAllCategories()
		.then(categories => dispatch(receiveAllCategories(categories)));
};

export const changeSelectedCategory = category => ({ type: CHANGE_SELECTED_CATEGORY, category })

export const receiveAllPosts = posts => ({ type: RECEIVE_ALL_POSTS, posts });
export const fetchAllPosts = () => dispatch => {
	ReadableAPI
		.fetchAllPosts()
		.then(posts => {
			posts.map(post => dispatch(fetchCommentsWithPost(post.id)));
			dispatch(receiveAllPosts(posts));
		});
};

export const receivePostsWithCategory = posts => ({ type: RECEIVE_POSTS_WITH_CATEGORY, posts });
export const fetchPostsWithCategory = categoryId => dispatch => {
  ReadableAPI
	.fetchPostsWithCategory(categoryId)
	.then(posts => {
		posts.map(post => dispatch(fetchCommentsWithPost(post.id)));
		dispatch(receivePostsWithCategory(posts))
	});
}

export const changePostsSorting = sorting => ({ type: CHANGE_POSTS_SORTING, sorting })

export const receivePostById = post => ({ type: RECEIVE_POST_BY_ID, post });
export const fetchPostById = postId => dispatch => {
	ReadableAPI
		.fetchPostById(postId)
		.then(post => {
			dispatch(fetchCommentsWithPost(post.id));
			dispatch(receivePostById(post));
		});
}

export const receiveCommentsWithPost = comments => ({ type: RECEIVE_ALL_COMMENTS_WITH_POST, comments });
export const fetchCommentsWithPost = postId => dispatch => {
  ReadableAPI
	.fetchCommentsWithPost(postId)
	.then(comments => dispatch(receiveCommentsWithPost(comments)));
}

export const receiveCommentById = comment => ({ type: RECEIVE_COMMENT_BY_ID, comment });
export const fetchCommentById = commentId => dispatch => {
  ReadableAPI
	  .fetchCommentById(commentId)
	  .then(comment => dispatch(receiveCommentById(comment)));
}

export const changeCommentsSorting = sorting => ({ type: CHANGE_COMMENTS_SORTING, sorting })

export const receiveCreatePost = post => ({ type: CREATE_POST, post });
export const createPost = postData => dispatch => {
	ReadableAPI
		.createPost(postData)
		.then(post => dispatch(receiveCreatePost(post)));
}

export const receiveDeletePostById = data => ({ type: DELETE_POST, data });
export const deletePostById = postId => dispatch => {
  ReadableAPI
	.deletePostById(postId)
	.then(data => dispatch(receiveDeletePostById(data)));
}

export const clearSelectedPost = data => ({ type: CLEAR_SELECTED_POST, data });

export const receiveEditPost = post => ({ type: EDIT_POST, post });
export const editPost = (postId, postData) => dispatch => {
	ReadableAPI
		.editPostById(postId, postData)
		.then(post => dispatch(receiveEditPost(post)));
}