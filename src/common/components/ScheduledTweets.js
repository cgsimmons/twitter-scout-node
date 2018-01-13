import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import CreateTweet from './CreateTweet';
import CreateTweetList from './CreateTweetList';
import ScheduledList from './ScheduledList';

class ScheduledTweets extends React.Component {

  render() {
    return (
      <Tabs className="ScheduledTweets">
        <TabList>
          <Tab>WRITE TWEET</Tab>
          <Tab>ADD LIST</Tab>
        </TabList>

        <TabPanel>
          <CreateTweet />
        </TabPanel>
        <TabPanel>
          <CreateTweetList />
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
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.scheduledListArray,
  };
};

export default connect(mapStateToProps)(ScheduledTweets);
