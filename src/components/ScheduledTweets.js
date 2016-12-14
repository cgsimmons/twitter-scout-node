import React from 'react';
import { connect } from 'react-redux';
import { setCounter } from '../actions/TweetActions';
import CreateTweet from './CreateTweet';
import CreateTweetList from './CreateTweetList';
import ScheduledList from './ScheduledList';
import TabPanel from 'react-tab-panel';

class ScheduledTweets extends React.Component {

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
        {
          this.props.lists.map (
            (list, index) => {
              return (
                <ScheduledList list={list} />
              )
            }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.scheduledListArray
  };
};

export default connect(mapStateToProps)(ScheduledTweets);
