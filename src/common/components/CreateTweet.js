import React from 'react';
import { connect } from 'react-redux';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import Select from 'react-select';
import { resetScheduledTweet, setCounter, setSelectedList, setScheduledTweetBody, setScheduledTweetPostDate, saveScheduledTweet } from '../actions/TweetActions';

const MAX_COUNT = 140;

class CreateTweet extends React.Component {

  handleText = (event) => {
    const input = event.target.value;
    this.props.setCount(MAX_COUNT - input.length);
    this.props.setBody(input);
  }

  handleDate = (datestr, dateObj) => {
    this.props.setDate(dateObj.dateMoment._d);
  }

  handleSelection = (selectObj) => {
    this.props.setSelection(selectObj.value);
    const lists = this.props.lists;
    // find currently selected list
    for (let i = 0; i < lists.length - 1; i += 1) {
      // if list matches selected list and startDate is not null
      if ((lists[i]._id === selectObj.value) && (lists[i].startDate !== null)) {
        const newDate = new Date(lists[i].startDate);
        let lastPostDate = new Date();
        if (lists[i].tweets.length > 0) {
          lastPostDate = new Date(lists[i].tweets[lists[i].tweets.length - 1].postDate);
        }

        switch (lists[i].interval) {
          case 'Day':
            while ((newDate < Date.now()) || (newDate <= lastPostDate)) {
              newDate.setDate(newDate.getDate() + 1);
            }
            break;
          case 'Week':
            while ((newDate < Date.now()) || (newDate <= lastPostDate)) {
              newDate.setDate(newDate.getDate() + 7);
            }
            break;
          case 'Month':
            while ((newDate < Date.now()) || (newDate <= lastPostDate)) {
              newDate.setMonth(newDate.getMonth() + 1);
            }
            break;
          default:
            break;
        }
        this.props.setDate(newDate);
        return;
      }
    }

    // if startDate was not set at this point it must be a list
    // for individually set tweet dates
    this.props.setDate(new Date());
  }

  handleSave = (event) => {
    event.preventDefault();

    if (this.props.lists.length < 1) {
      alert('Please add a list.');
      return;
    }
    this.props.saveTweet(this.props.tweet, this.props.userId);
    this.props.setBody('');
  }

  render() {
    const selections = this.props.lists.map((list) => {
      return ({ value: list._id, label: list.title, startDate: list.startDate });
    });
    let disableDate = false;
    if (this.props.lists.length > 0) {
      const result = this.props.lists.filter(
        (list) => { return list._id === this.props.selection; });
      if (result.length > 0) {
        if (result[0].interval !== '') {
          disableDate = true;
        }
      } else {
        this.handleSelection({ value: this.props.lists[0]._id });
      }
    }

    return (
      <div className="CreateTweet main-panel">
        <h1 className="section-header">Write a Tweet</h1>
        <br />
        <p>Publish your tweet at a specific time or add it to a list of tweets
           to be published at a specified interval.</p><br />
        <div className="tweet-box">
          <textarea
            autoFocus="true"
            placeholder="Enter a tweet..."
            maxLength="140"
            rows="3"
            onChange={this.handleText} value={this.props.tweetBody}
          />
          <br /><br />
          <label htmlFor="date">Date to post</label><br />
          <DateField
            forceValidDate
            value={this.props.tweetDate}
            onChange={this.handleDate}
            dateFormat="YYYY-MM-DD hh:mm a"
            disabled={disableDate}
          >
            <TransitionView>
              <Calendar />
            </TransitionView>
          </DateField>
          <br /><br />
          <label htmlFor="list">Add to list</label><br />
          <Select
            placeholder="No lists available"
            value={this.props.selection}
            onChange={this.handleSelection}
            options={selections}
            clearable={false}
          />
          <div className="tweet-btn-container">
            <span>{this.props.counter}</span>
            <button className="submit-button" onClick={this.handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    tweet: state.scheduledTweet,
    counter: state.scheduledTweet.tweetCounter,
    selection: state.scheduledTweet.selectedList,
    tweetBody: state.scheduledTweet.body,
    tweetDate: state.scheduledTweet.postDate,
    lists: state.scheduledListArray,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCount: (num) => { dispatch(setCounter(num)); },
    setSelection: (val) => { dispatch(setSelectedList(val)); },
    setBody: (body) => { dispatch(setScheduledTweetBody(body)); },
    setDate: (date) => { dispatch(setScheduledTweetPostDate(date)); },
    saveTweet: (tweet, user) => { dispatch(saveScheduledTweet(tweet, user)); },
    resetTweet: () => { dispatch(resetScheduledTweet()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweet);
