import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shortid from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPost, fetchAllCategories, changeSelectedCategory, fetchPostById, editPostById, clearSelectedPost } from '../actions';
import serializeForm from 'form-serialize';
import { capitalize } from '../utils/helpers';

class PostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // variable to know if we're in adding or editing a comment
      isEditing: false,
    }
  }

  componentDidMount() {
    // gets all the categories
    this.props.fetchAllCategories();
    // selects the current category based on the current post
    this.props.changeSelectedCategory(this.props.match.params.category);

    // if the postId match param is set, we are in Edit mode of an existing post
    const { params } = this.props.match;
    if (params.hasOwnProperty('postId')) {
      this.setState({
        isEditing: true,
      })
      // gets the post data
      this.props.fetchPostById(params.postId);
    }
  }

  componentWillUnmount() {
    // clears the selected post from the posts reducer
    this.props.clearSelectedPost();
  }

  // handles the submit of the form
  handleSubmit = () => {
    // checks whether the form is valid
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
        this.props.editPostById(data.id, data);
      }
      else {
        data = {
          id: Shortid.generate(),
          timestamp: Date.now(),
          ...serializeForm(this.createPostForm, { hash: true }),
        };
        this.props.createPost(data);
      }
      // redirects to the current post page in wiew mode
      this.props.history.push(`/${data.category}/${data.id}`)
    }
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='App-wrapper'>
        <div className='App-content'>
          <form ref={form => this.createPostForm = form} className='post-form'>
            <div className='create-post-details'>
              <Field name='title' component='input' type='text' placeholder='Title' required />
              <Field name='body' component='textarea' placeholder='Content' required />
              <Field name='author' component='input' type='text' placeholder='Author' required disabled={this.state.isEditing} />
              <Field name='category' component='select' required disabled={this.state.isEditing}>
                <option value=''>Select a Category</option>
                {categories.list.map(category =>
                  <option value={category.name} key={category.path}>{capitalize(category.name)}</option>
                )}
              </Field>
            </div>
          </form>
        </div>
        <div className='App-sidebar'>
          <button onClick={this.handleSubmit}>Save Post</button>
          <Link to={`${categories.selected === 'all' ? '/' : '/'+categories.selected}`}>Cancel</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
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
    editPostById: (postId, data) => dispatch(editPostById(postId, data)),
  }
};

PostForm.propTypes = {
  createPost: PropTypes.func,
  editPostById: PropTypes.func,
  fetchAllCategories: PropTypes.func,
  fetchPostById: PropTypes.func,
  categories: PropTypes.object,
  posts: PropTypes.object,
  changeSelectedCategory: PropTypes.func,
  clearSelectedPost: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
};
PostForm.defaultProps = { extended: false };

// Decorate with reduxForm(), it reads the initialValues prop provided by connect()
PostForm = reduxForm({
  form: 'post-form',
})(PostForm);

// Provides the initial values for the form when in edit mode
PostForm = connect(
  state => ({
    initialValues: state.posts.selected, // pull initial values from posts reducer
  }),
)(PostForm);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));