import React, { Component } from 'react';
import '../css/App.css';
import FaBook from 'react-icons/lib/fa/book';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';
import Categories from './Categories';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Categories />
        <div className='App-header'>
          <div className='logo'><FaBook/>&nbsp;Readable</div>
          <ul className='sortmenu'>
            <li><a href='#' className='active'>top</a></li>
            <li><a href='#'>new</a></li>
          </ul>
        </div>
        <div className='App-content'>
          <ul className='list'>
            <li className='list-item'>
              <div className='votes'>
                <a className='arrow up' href='#'><TiArrowUp size={24}/></a>
                <div className='score'>$VOTES</div>
                <a className='arrow down' href='#'><TiArrowDown size={24} /></a>
              </div>
              <div className='post'>
                <div className='title'><a href='#'>$TITLE</a></div>
                <div className='details'>submitted $TIME by $AUTOR to <a href='#'>$CATEGORY</a></div>
                <div className='comments'><a href='#'>$TOTAL_COMMENTS</a> comments</div>
              </div>
            </li>
            <li className='list-item'>
              <div className='votes'>
                <a className='arrow up' href='#'><TiArrowUp size={24}/></a>
                <div className='score'>$VOTES</div>
                <a className='arrow down' href='#'><TiArrowDown size={24} /></a>
              </div>
              <div className='post'>
                <div className='title'><a href='#'>$TITLE</a></div>
                <div className='details'>submitted $TIME by $AUTOR to <a href='#'>$CATEGORY</a></div>
                <div className='comments'><a href='#'>$TOTAL_COMMENTS</a> comments</div>
              </div>
            </li>
            <li className='list-item'>
              <div className='votes'>
                <a className='arrow up' href='#'><TiArrowUp size={24}/></a>
                <div className='score'>$VOTES</div>
                <a className='arrow down' href='#'><TiArrowDown size={24} /></a>
              </div>
              <div className='post'>
                <div className='title'><a href='#'>$TITLE</a></div>
                <div className='details'>submitted $TIME by $AUTOR to <a href='#'>$CATEGORY</a></div>
                <div className='comments'><a href='#'>$TOTAL_COMMENTS</a> comments</div>
              </div>
            </li>
            <li className='list-item'>
              <div className='votes'>
                <a className='arrow up' href='#'><TiArrowUp size={24}/></a>
                <div className='score'>$VOTES</div>
                <a className='arrow down' href='#'><TiArrowDown size={24} /></a>
              </div>
              <div className='post'>
                <div className='title'><a href='#'>$TITLE</a></div>
                <div className='details'>submitted $TIME by $AUTOR to <a href='#'>$CATEGORY</a></div>
                <div className='comments'><a href='#'>$TOTAL_COMMENTS</a> comments</div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    );
  }
}

export default App;