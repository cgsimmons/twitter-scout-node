import React from 'react';
import { Link } from 'react-router';

export default function Sidebar(props) {
    const baseDashPath = `/user/${props.userId}`;
    const suggestedTweets = `${baseDashPath}/suggested-tweets`;
    const suggestedTweeters = `${baseDashPath}/suggested-tweeters`;
    const statistics = `${baseDashPath}/statistics`;
    const searchSettings = `${baseDashPath}/search-settings`;

    return (
      <div className="Sidebar dashboard-panel">
        <ul>
          <li><Link onlyActiveOnIndex activeClassName="active-sidebar" to={baseDashPath}>Scheduled Tweets</Link></li>
          <hr />
          <li><Link activeClassName="active-sidebar" to={suggestedTweets}>Suggested Tweets</Link></li>
          <hr />
          <li><Link activeClassName="active-sidebar" to={suggestedTweeters}>Suggested Tweeters</Link></li>
          <hr />
          <li><Link activeClassName="active-sidebar" to={statistics}>Statistics</Link></li>
          <hr />
          <li><Link activeClassName="active-sidebar" to={searchSettings}>Search Settings</Link></li>
        </ul>
      </div>
    );
}
