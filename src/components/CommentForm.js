import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shortid from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createComment, editCommentById, clearSelectedComment, fetchCommentById } from '../actions';
import serializeForm from 'form-serialize';

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    }
  }

  componentDidMount() {
    // if the commentId prop is set and is not null, we are in Edit mode of an existing comment
    if (this.props.commentId && this.props.commentId !== null) {
      this.setState({
        isEditing: true,
      });
      this.props.fetchCommentById(this.props.commentId);
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedComment();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    if (this.state.isEditing) {
      data = {
        ...this.props.posts.selectedComment,
        ...serializeForm(e.target, { hash: true }),
      }
      this.props.editCommentById(data.id, data);
    }
    else {
      data = {
        id: Shortid.generate(),
        timestamp: Date.now(),
        parentId: this.props.posts.selected.id,
        ...serializeForm(e.target, { hash: true }),
      };
      this.props.createComment(data);
    }
    this.props.closeCommentModal();
  }

  render() {
    return (
      <div>
        <h2>{this.state.isEditing ? 'Edit' : 'Add'} Comment</h2>
        <form className='comment-form' onSubmit={this.handleSubmit}>
          <div className='create-post-details'>
            <Field name='body' component='textarea' placeholder='Comment' required />
            <Field name='author' component='input' type='text' placeholder='Author' required disabled={this.state.isEditing} />
            <button type='submit'>Save comment</button>
            <button onClick={this.props.closeCommentModal}>Cancel</button>
          </div>
        </form>
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
    createComment: data => dispatch(createComment(data)),
    clearSelectedComment: data => dispatch(clearSelectedComment(data)),
    fetchCommentById: commentId => dispatch(fetchCommentById(commentId)),
    editCommentById: (commentId, data) => dispatch(editCommentById(commentId, data)),
  }
};

CommentForm.propTypes = {
  createComment: PropTypes.func,
  closeCommentModal: PropTypes.func,
  commentId: PropTypes.string,
  fetchCommentById: PropTypes.func,
  clearSelectedComment: PropTypes.func,
  editCommentById: PropTypes.func,
  posts: PropTypes.object,
};
CommentForm.defaultProps = { extended: false };

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
CommentForm = reduxForm({
  form: 'comment-form',
})(CommentForm);

CommentForm = connect(
  state => ({
    initialValues: state.posts.selectedComment, // pull initial values from posts reducer
  }),
)(CommentForm);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));