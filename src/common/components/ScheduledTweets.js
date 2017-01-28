import React from 'react';
import TabPanel from 'react-tab-panel';
import { connect } from 'react-redux';
import CreateTweet from './CreateTweet';
import CreateTweetList from './CreateTweetList';
import ScheduledList from './ScheduledList';

class ScheduledTweets extends React.Component {

  render() {
    return (
      <div className="ScheduledTweets">
        <TabPanel>
          <div tabTitle="WRITE TWEET">
            <CreateTweet />
          </div>
          <div tabTitle="ADD LIST">
            <CreateTweetList />
          </div>
        </TabPanel>
        {
          this.props.lists.map(
            (list) => {
              return (
                <ScheduledList list={list} />
              );
            },
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.scheduledListArray,
  };
};

export default connect(mapStateToProps)(ScheduledTweets);
