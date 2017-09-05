import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shortid from 'shortid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createPost, fetchAllCategories } from '../actions';
import serializeForm from 'form-serialize';
import { capitalize } from '../utils/helpers';

class PostCreate extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  postData(e) {
    e.preventDefault();
    const data = serializeForm(e.target, { hash:true });
    console.log(data);
    //console.log(Shortid.generate());
    //this.props.createPost(data);
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        id, timestamp, title, body, owner, category
        <form onSubmit={this.postData} className='create-post-form'>
          <div className='create-post-details'>
            <input type='text' name='title' placeholder='Title' />
            <textarea name='body' />
            <input type='text' name='owner' placeholder='Author' />
            <select name='category'>
              {categories.list.map(category =>
                <option value={category.name} key={category.path}>{capitalize(category.name)}</option>
              )}
            </select>
            <button>Add Post</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: postData => dispatch(createPost(postData)),
    fetchAllCategories: data => dispatch(fetchAllCategories()),
  }
};

PostCreate.propTypes = {
  createPost: PropTypes.func,
  fetchAllCategories: PropTypes.func,
  categories: PropTypes.object,
};
PostCreate.defaultProps = { extended: false };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCreate));