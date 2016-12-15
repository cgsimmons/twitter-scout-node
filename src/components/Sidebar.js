import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class Sidebar extends React.Component {
  render(){
    const baseDashPath = `/user/${this.props.userId}`;
    return (
      <div className='Sidebar dashboard-panel'>
        <ul>
          <li><Link onlyActiveOnIndex activeClassName='active-sidebar' to={baseDashPath}>Scheduled Tweets</Link></li>
          <hr/>
          <li><Link activeClassName='active-sidebar' to={baseDashPath + '/suggested-tweets'}>Suggested Tweets</Link></li>
          <hr/>
          <li><Link activeClassName='active-sidebar' to={baseDashPath + '/suggested-tweeters'}>Suggested Tweeters</Link></li>
          <hr/>
          <li><Link activeClassName='active-sidebar' to={baseDashPath + '/statistics'}>Statistics</Link></li>
          <hr/>
          <li><Link activeClassName='active-sidebar' to={baseDashPath + '/search-settings'}>Search Settings</Link></li>
        </ul>
      </div>
    );
  }
}
