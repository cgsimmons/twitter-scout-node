import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteTweetFromList } from '../actions/ScheduledListActions';

class ScheduledTweet extends React.Component {

  handleTweetDelete = () => {
    // this.props.deleteList(this.props.list.title);
    const r = confirm('Are you sure you want to delete this tweet?');
    if (r) {
      this.props.deleteTweet(this.props.tweet);
    }
  }

  render() {
    return (
      <li className="scheduledTweet" id={this.props.tweet._id}><hr /><h4>{this.props.tweet.body}</h4>
        <a className="ReactTags__remove" onClick={this.handleTweetDelete}>×</a>
        <p>Scheduled for {moment(this.props.tweet.postDate).format('MMM Do YYYY, h:mm a')}</p>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTweet: (tweet) => { dispatch(deleteTweetFromList(tweet)); },
  };
};

export default connect(null, mapDispatchToProps)(ScheduledTweet);
