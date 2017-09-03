import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shortid from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { fetchCommentsWithPost, changeSelectedCategory } from '../actions';
//import { urlize } from '../utils/helpers';

class PostCreate extends Component {
  componentDidMount() {
  }

  render() {
    //console.log(Shortid.generate());
    return (
      <div>
        id, timestamp, title, body, owner, category
      </div>
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