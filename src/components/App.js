import React, { Component } from 'react';
import '../css/App.css';
import FaBook from 'react-icons/lib/fa/book';
import Categories from './Categories';
import PostsList from './PostsList';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Categories />
        <div className='App-header'>
          <div className='logo'><FaBook/>&nbsp;Readable</div>
          <ul className='sortmenu'>
            <li><a href='#top' className='active'>top</a></li>
            <li><a href='#new'>new</a></li>
          </ul>
        </div>
        <PostsList />
      </div>
    );
  }
}

export default App;