import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shortid from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPost, fetchAllCategories, changeSelectedCategory, fetchPostById, editPost, clearSelectedPost } from '../actions';
import serializeForm from 'form-serialize';
import { capitalize, urlize } from '../utils/helpers';

class CommentForm extends Component {

  /*constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isEditing: false,
    }
  }

  componentDidMount() {
    this.props.fetchAllCategories();
    this.props.changeSelectedCategory(this.props.match.params.category);

    // if the postId match param is set, we are in Edit mode of an existing post
    const { params } = this.props.match;
    if (params.hasOwnProperty('postId')) {
      this.setState({
        isEditing: true,
      })
      this.props.fetchPostById(params.postId);
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedPost();
  }

  handleSubmit() {
    if (this.createPostForm.checkValidity && !this.createPostForm.checkValidity()) {
      this.createPostForm.reportValidity && this.createPostForm.reportValidity();
    }
    else {
      let data = {};
      if (this.state.isEditing) {
        data = {
          ...this.props.posts.selected,
          ...serializeForm(this.createPostForm, { hash: true }),
        }
        this.props.editPost(data.id, data);
      }
      else {
        data = {
          id: Shortid.generate(),
          timestamp: Date.now(),
          ...serializeForm(this.createPostForm, { hash: true }),
        };
        this.props.createPost(data);
      }
      this.props.history.push(`/r/${data.category}/comments/${data.id}/${urlize(data.title)}`)
    }
  }*/

  render() {
    const { categories } = this.props;

    return (
      <div>
        <form className='comment-form'>
          <div className='create-post-details'>
            <Field name='body' component='textarea' placeholder='Comment' required />
            <Field name='author' component='input' type='text' placeholder='Author' required />
            <button type='submit'>Send comment</button>
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
    createPost: postData => dispatch(createPost(postData)),
    fetchAllCategories: data => dispatch(fetchAllCategories()),
    changeSelectedCategory: data => dispatch(changeSelectedCategory(data)),
    fetchPostById: postId => dispatch(fetchPostById(postId)),
    clearSelectedPost: data => dispatch(clearSelectedPost(data)),
    editPost: (postId, data) => dispatch(editPost(postId, data)),
  }
};

CommentForm.propTypes = {
  createPost: PropTypes.func,
  editPost: PropTypes.func,
  fetchAllCategories: PropTypes.func,
  fetchPostById: PropTypes.func,
  categories: PropTypes.object,
  posts: PropTypes.object,
  changeSelectedCategory: PropTypes.func,
  clearSelectedPost: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
};
CommentForm.defaultProps = { extended: false };

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
CommentForm = reduxForm({
  form: 'comment-form',
})(CommentForm);

/*CommentForm = connect(
  state => ({
    initialValues: state.posts.selected, // pull initial values from posts reducer
  }),
)(CommentForm);*/

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));