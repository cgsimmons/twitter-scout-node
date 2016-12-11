import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class Sidebar extends React.Component {
  render(){
    const baseDashPath = `/user/${this.props.userId}`;
    return (
      <div className='Sidebar dashboard-panel'>
        <ul>
          <li><Link activeClassName='active-sidebar' to={baseDashPath}>Statistics</Link></li>
          <hr/>
          <li><Link to={baseDashPath + '/scheduled-tweets'}>Scheduled Tweets</Link></li>
          <hr/>
          <li><Link to={baseDashPath + '/suggested-tweets'}>Suggested Tweets</Link></li>
          <hr/>
          <li><Link to={baseDashPath + '/suggested-tweeters'}>Suggested Tweeters</Link></li>
          <hr/>
          <li><Link to={baseDashPath + '/search-settings'}>Search Settings</Link></li>
        </ul>
      </div>
    );
  }
}
