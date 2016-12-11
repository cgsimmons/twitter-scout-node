import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class Sidebar extends React.Component {
  render(){

    return (
      <div className='Sidebar'>
        <ul>
          <li>Statistics</li>
          <hr/>
          <li>Scheduled Tweets</li>
          <hr/>
          <li>Suggested Tweets</li>
          <hr/>
          <li>Suggested Tweeters</li>
          <hr/>
          <li>Search Settings</li>
        </ul>
      </div>
    );
  }
}
