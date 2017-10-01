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

class PostForm extends Component {

  constructor(props) {
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
          <Link to={`${categories.selected === 'all' ? '/' : '/r/'+categories.selected}`}>Cancel</Link>
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
    editPost: (postId, data) => dispatch(editPost(postId, data)),
  }
};

PostForm.propTypes = {
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
PostForm.defaultProps = { extended: false };

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PostForm = reduxForm({
  form: 'post-form',
})(PostForm);

PostForm = connect(
  state => ({
    initialValues: state.posts.selected, // pull initial values from posts reducer
  }),
)(PostForm);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));