import React from 'react';
import { connect } from 'react-redux';
import { setCounter } from '../actions/TweetActions';
import CreateTweet from './CreateTweet';
import CreateTweetList from './CreateTweetList';
import TabPanel from 'react-tab-panel';

export default class ScheduledTweets extends React.Component {

  render(){
    return (
      <div className='ScheduledTweets'>
        <TabPanel>
          <div tabTitle="WRITE TWEET">
            <CreateTweet />
          </div>
          <div tabTitle='ADD LIST'>
            <CreateTweetList />
          </div>
        </TabPanel>
      </div>
    );
  }
}
