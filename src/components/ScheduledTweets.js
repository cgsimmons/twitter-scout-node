import React from 'react';
import { connect } from 'react-redux';
import { setCounter } from '../actions/TweetActions';
import CreateTweet from './CreateTweet';
import CreateTweetList from './CreateTweetList';

export default class ScheduledTweets extends React.Component {

  render(){
    return (
      <div className='ScheduledTweets'>
        <CreateTweet />
        <CreateTweetList />
      </div>
    );
  }
}
