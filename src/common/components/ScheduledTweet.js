import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteTweetFromList } from '../actions/ScheduledListActions';

function ScheduledTweet(props) {
    const handleTweetDelete = () => {
        const r = confirm('Are you sure you want to delete this tweet?');
        if (r) {
            props.deleteTweet(props.tweet);
        }
    };

    return (
      <li className="scheduledTweet" id={props.tweet._id}><hr /><h4>{props.tweet.body}</h4>
        <button className="ReactTags__remove" onClick={handleTweetDelete}>×</button>
        <p>Scheduled for {moment(props.tweet.postDate).format('MMM Do YYYY, h:mm a')}</p>
      </li>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTweet: (tweet) => { dispatch(deleteTweetFromList(tweet)); },
    };
};

export default connect(null, mapDispatchToProps)(ScheduledTweet);
