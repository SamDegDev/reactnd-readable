import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shortid from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPost, fetchAllCategories, changeSelectedCategory, fetchPostById, clearSelectedPost } from '../actions';
import serializeForm from 'form-serialize';
import { capitalize, urlize } from '../utils/helpers';

class PostCreate extends Component {

  componentDidMount() {
    this.props.fetchAllCategories();
    this.props.changeSelectedCategory(this.props.match.params.category);

    // if the postId match param is set, we are in Edit mode of an existing post
    const { params } = this.props.match;
    if (params.hasOwnProperty('postId')) {
      this.props.fetchPostById(params.postId);
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedPost();
  }

  postData(e) {
    e.preventDefault();
    const data = {
      ...serializeForm(e.target, { hash: true }),
      id: Shortid.generate(),
      timestamp: Date.now(),
    };
    this.props.createPost(data);
    this.props.history.push(`/r/${data.category}/comments/${data.id}/${urlize(data.title)}`)
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='App-wrapper'>
        <div className='App-content'>
          <form ref={form => this.form = form} onSubmit={(e) => this.postData(e)} className='create-post-form' id='create-post-form'>
            <div className='create-post-details'>
              <Field name='title' component='input' type='text' placeholder='Title' required />
              <Field name='body' component='textarea' placeholder='Content' required />
              <Field name='author' component='input' type='text' placeholder='Author' required />
              <Field name='category' component='select' required>
                <option value=''>Select a Category</option>
                {categories.list.map(category =>
                  <option value={category.name} key={category.path}>{capitalize(category.name)}</option>
                )}
              </Field>
              <button type='submit'>Save Post</button>
            </div>
          </form>
        </div>
        <div className='App-sidebar'>
          <button >Save Post</button>
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
  }
};

PostCreate.propTypes = {
  createPost: PropTypes.func,
  fetchAllCategories: PropTypes.func,
  fetchPostById: PropTypes.func,
  categories: PropTypes.object,
  changeSelectedCategory: PropTypes.func,
  clearSelectedPost: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
};
PostCreate.defaultProps = { extended: false };

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PostCreate = reduxForm({
  form: 'create-post-form',
})(PostCreate);

PostCreate = connect(
  state => ({
    initialValues: state.posts.selected, // pull initial values from posts reducer
  }),
)(PostCreate);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCreate));