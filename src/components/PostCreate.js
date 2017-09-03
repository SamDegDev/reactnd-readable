import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { fetchCommentsWithPost, changeSelectedCategory } from '../actions';
//import { urlize } from '../utils/helpers';

class PostCreate extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>Create post</div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
};

PostCreate.propTypes = {
};
PostCreate.defaultProps = { extended: false };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCreate));