import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchCommentsWithPost, changeSelectedCategory } from '../actions';
import { urlize } from '../utils/helpers';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';
import TimeAgo from 'react-timeago';

class PostItem extends Component {
  componentDidMount() {
    if (this.props.extended) {
      this.props.fetchCommentsWithPost(this.props.match.params.postId);
      this.props.changeSelectedCategory(this.props.match.params.category);
    }
  }

  render() {
    const { post, extended, comments } = this.props;

    if (post !== null) {
      return (
        <div className='post-item' key={post.id}>
          <div className='votes'>
            <a className='arrow up' href='#up'><TiArrowUp size={24} /></a>
            <div className='score'>{post.voteScore}</div>
            <a className='arrow down' href='#down'><TiArrowDown size={24} /></a>
          </div>
          <div className='post'>
            <div className='title'><Link to={`/r/${post.category}/comments/${post.id}/${urlize(post.title)}`}>{post.title}</Link></div>
            <div className='details'>submitted <TimeAgo date={post.timestamp} /> by {post.author} to <Link to={`/r/${post.category}`}>/r/{post.category}</Link></div>
            {extended &&
              <div className='body'>
                {post.body}
              </div>
            }
            {extended && comments.list.length > 0 &&
              <div className='comments'>
                <div className='comments-header'> All {comments.list.length} comments sorted by score</div>
                <ul>
                  {comments.list.map(comment => (
                    <li key={comment.id}>
                      <div className='votes'>
                        <a className='arrow up' href='#up'><TiArrowUp size={24} /></a>
                        <div className='score'>{comment.voteScore}</div>
                        <a className='arrow down' href='#down'><TiArrowDown size={24} /></a>
                      </div>
                      <div className='comment'>
                        <div className='title'><span className='author'>{comment.author}</span> {comment.voteScore} points <TimeAgo date={comment.timestamp} /></div>
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

function mapStateToProps({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCommentsWithPost: postId => dispatch(fetchCommentsWithPost(postId)),
    changeSelectedCategory: data => dispatch(changeSelectedCategory(data)),
  }
};

PostItem.propTypes = {
  post: PropTypes.object,
  extended: PropTypes.bool,
  comments: PropTypes.object,
  match: PropTypes.object,
  fetchCommentsWithPost: PropTypes.func,
  changeSelectedCategory: PropTypes.func,
};
PostItem.defaultProps = { extended: false };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostItem));