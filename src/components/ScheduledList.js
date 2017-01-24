import React from 'react';
import { connect } from 'react-redux';
import { removeAndDeleteScheduledListArray } from '../actions/ScheduledListActions';
import moment from 'moment';

class ScheduledList extends React.Component {

  handleListDelete = (event) => {
    // this.props.deleteList(this.props.list.title);
    let r = confirm("Are you sure you want to delete all tweets associated with this list?");
    if(r)
      this.props.deleteList(this.props.list);
  }

  handleTweetDelete = (event) => {
    // this.props.deleteList(this.props.list.title);
    let r = confirm("Are you sure you want to delete this tweet?");
    if(r)
      console.log('deleted');
      // this.props.deleteList(this.props.list);
      // TODO: make delete method
  }

  render(){
    let message;
    if (this.props.list.interval === ''){
      message = <p>These tweets will each be posted according to their individually set times.</p>;
    } else {
      message = <p>{this.props.list.interval.replace('y', 'i')}ly from {moment(this.props.list.startDate).format("MMM Do YYYY, h:mm a")}</p>;
    }

    return (
      <div className='ScheduledList dashboard-panel main-panel'>
        <h3>{this.props.list.title}</h3>
        <span className="ReactTags__tag">
          <a className="ReactTags__remove delete" onClick={this.handleListDelete}>×</a>
        </span>
        {message}
        <ul>
        {
          this.props.list.tweets.map (
            (tweet, index) => {
              return (
                <li className='scheduledTweet'><hr/><h4>{tweet.body}</h4>
                  <a className="ReactTags__remove delete" onClick={this.handleTweetDelete}>×</a>
                  <p>Scheduled for {moment(tweet.postDate).format("MMM Do YYYY, h:mm a")}</p>
                </li>
              );
            }
          )
        }
      </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList:   (list) => dispatch(removeAndDeleteScheduledListArray(list)),
  };
};

export default connect(null, mapDispatchToProps)(ScheduledList);
