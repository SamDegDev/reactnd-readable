import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchPostById } from '../actions';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';
import TimeAgo from 'react-timeago';

class PostsDetail extends Component {

  componentDidMount() {
    //this.props.fetchPostById()
    console.log(this.props)
  }

  render() {
    const { posts } = this.props;
    return (
      <div className='App-content'>
        DETAIL
        {/*
          <div className='votes'>
            <a className='arrow up' href='#up'><TiArrowUp size={24}/></a>
            <div className='score'>{post.voteScore}</div>
            <a className='arrow down' href='#down'><TiArrowDown size={24} /></a>
          </div>
          <div className='post'>
            <div className='title'><a href='#title'>{post.title}</a></div>
            <div className='details'>submitted <TimeAgo date={post.timestamp} /> by {post.author} to <Link to={`/r/${post.category}`}>/r/{post.category}</Link></div>
            <div className='comments'><a href='#comments'>$TOTAL_COMMENTS</a> comments</div>
          </div>
        */}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostById: data => dispatch(fetchPostById(data)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsDetail));