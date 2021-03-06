import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  fetchCommentsWithPost,
  changeSelectedCategory,
  deleteCommentById,
  votePostById,
  voteCommentById,
  changeCommentsSorting,
  deletePostById
} from '../actions';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import TimeAgo from 'react-timeago';

class PostItem extends Component {

  constructor(props) {
    super(props);
    this.editCommentById = this.editCommentById.bind(this);
    this.deleteCommentById = this.deleteCommentById.bind(this);
    this.votePost = this.votePost.bind(this);
    this.voteComment = this.voteComment.bind(this);
    this.toggleCommentsSortingList = this.toggleCommentsSortingList.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    if (this.props.extended) {
      this.props.changeSelectedCategory(this.props.match.params.category);
    }
  }

  // opens the comments modal defined in the parent component passing the id of the comment
  editCommentById = commentId => {
    this.props.openCommentModal(commentId);
  }

  // deletes a comment by its id
  deleteCommentById = (commentId, postId) => {
    if (window.confirm('Do you really want to delete this Comment?')) {
      this.props.deleteCommentById(commentId);
      this.props.fetchCommentsWithPost(postId);
    }
  }

  // handles the votes for posts
  votePost = (vote, postId) => {
    if (['upVote', 'downVote'].indexOf(vote) >= 0) {
      this.props.votePostById(postId, {option: vote});
    }
  }

  // handles the votes for comments
  voteComment = (vote, commentId) => {
    if (['upVote', 'downVote'].indexOf(vote) >= 0) {
      this.props.voteCommentById(commentId, {option: vote});
    }
  }

  // shows or hide the comments sorting list
  toggleCommentsSortingList = () => {
    this.commentsSortingList.style.display =
      this.commentsSortingList.style.display === 'none'
      ? 'block'
      : 'none';
  }

  // deletes a post and redirects to the category list
  deletePost(post) {
    if (window.confirm('Do you really want to delete this Post?')) {
      this.props.deletePostById(post.id);
      const { categories } = this.props;
      this.props.history.push(`${categories.selected === 'all' ? '/' : '/'+categories.selected}`)
    }
  }

  render() {
    const { post, extended } = this.props;

    if (post !== null) {
      return (
        <div className='post-item' key={post.id}>
          <div className='votes'>
            <TiArrowUp size={24} onClick={() => this.votePost('upVote', post.id)} />
            <div className='score'>{post.voteScore}</div>
            <TiArrowDown size={24} onClick={() => this.votePost('downVote', post.id)} />
          </div>
          <div className='post'>
            <div className='title'><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></div>
            <div className='details'>
              <Link to={`/${post.category}/edit/${post.id}`}>edit</Link> | <Link to='#delete-post' onClick={() => this.deletePost(post)}>delete</Link>
              <br />submitted <TimeAgo date={post.timestamp} /> by {post.author} to <Link to={`/${post.category}`}>/{post.category}</Link>
              <br />{post.comments ? `${post.comments.length} comments` : '0 comments'}

            </div>
            {extended &&
              <div className='body'>
                {post.body}
              </div>
            }
            {extended && post.comments && post.comments.length > 0 &&
              <div className='comments'>
                <div className='comments-header'> All {post.comments.length} comments sorted by: {this.props.posts.commentsSorting}
                  <FaCaretDown className='comments-sorting-img' size={12} onClick={() => this.toggleCommentsSortingList()} />
                  <div className='comments-sorting-list' style={{display: 'none'}} ref={div => this.commentsSortingList = div}>
                    <Link to='#comments-sorting-top' onClick={() => this.props.changeCommentsSorting('top') && this.toggleCommentsSortingList()}>top</Link><br />
                    <Link to='#comments-sorting-new' onClick={() => this.props.changeCommentsSorting('new') && this.toggleCommentsSortingList()}>new</Link>
                  </div>
                </div>
                <ul>
                  {post.comments.map(comment => (
                    <li key={comment.id}>
                      <div className='votes'>
                        <TiArrowUp size={24} onClick={() => this.voteComment('upVote', comment.id)} />
                        <div className='score'>{comment.voteScore}</div>
                        <TiArrowDown size={24} onClick={() => this.voteComment('downVote', comment.id)} />
                      </div>
                      <div className='comment'>
                        <div className='title'>
                          by <span className='author'>{comment.author}</span> {comment.voteScore} points <TimeAgo date={comment.timestamp} /><br />
                          <Link to='#edit-comment' onClick={() => this.editCommentById(comment.id)}>edit</Link>&nbsp;|&nbsp;
                          <Link to='#delete-comment' onClick={() => this.deleteCommentById(comment.id, comment.parentId)}>delete</Link>
                        </div>
                        <div className='body'>{comment.body}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            }
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    posts,
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCommentsWithPost: postId => dispatch(fetchCommentsWithPost(postId)),
    changeSelectedCategory: data => dispatch(changeSelectedCategory(data)),
    deleteCommentById: commentId => dispatch(deleteCommentById(commentId)),
    votePostById: (postId, vote) => dispatch(votePostById(postId, vote)),
    voteCommentById: (commentId, vote) => dispatch(voteCommentById(commentId, vote)),
    changeCommentsSorting: sorting => dispatch(changeCommentsSorting(sorting)),
    deletePostById: postId => dispatch(deletePostById(postId)),
  }
};

PostItem.propTypes = {
  post: PropTypes.object,
  extended: PropTypes.bool,
  match: PropTypes.object,
  changeSelectedCategory: PropTypes.func,
  openCommentModal: PropTypes.func,
  deleteCommentById: PropTypes.func,
  fetchCommentsWithPost: PropTypes.func,
  votePostById: PropTypes.func,
  voteCommentById: PropTypes.func,
  posts: PropTypes.object,
  categories: PropTypes.object,
  changeCommentsSorting: PropTypes.func,
  deletePostById: PropTypes.func,
  history: PropTypes.object,
};
PostItem.defaultProps = { extended: false };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostItem));