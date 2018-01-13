import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteScheduledListArray, deleteTweetFromList } from '../actions/ScheduledListActions';
import ScheduledTweet from './ScheduledTweet';

class ScheduledList extends React.Component {
    handleListDelete = () => {
      // this.props.deleteList(this.props.list.title);
        const r = confirm('Are you sure you want to delete all tweets associated with this list?');
        if (r) {
            this.props.deleteList(this.props.list);
        }
    }

    render() {
        let message;
        if (this.props.list.interval === '') {
            message = (
              <p>
                These tweets will each be posted according to their individually set times.
              </p>
            );
        } else {
            message = <p>{this.props.list.interval.replace('y', 'i')}ly from {moment(this.props.list.startDate).format('MMM Do YYYY, h:mm a')}</p>;
        }

        return (
          <div className="ScheduledList dashboard-panel main-panel">
            <h3>{this.props.list.title}</h3>
            <span className="ReactTags__tag">
              <button className="ReactTags__remove" onClick={this.handleListDelete}>×</button>
            </span>
            {message}
            <ul>
              {
                      this.props.list.tweets.map((tweet) => {
                          return (
                            <ScheduledTweet tweet={tweet} />
                          );
                      })
                  }
            </ul>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteList: (list) => { dispatch(deleteScheduledListArray(list)); },
        deleteTweet: (tweet) => { dispatch(deleteTweetFromList(tweet)); },
    };
};

export default connect(null, mapDispatchToProps)(ScheduledList);
