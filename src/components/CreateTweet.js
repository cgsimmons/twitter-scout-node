import React from 'react';
import { connect } from 'react-redux';
import { resetScheduledTweet, setCounter, setSelectedList, setScheduledTweetBody } from '../actions/TweetActions';
import { saveScheduledTweet } from '../actions/ScheduledListActions';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import Select from 'react-select';

const MAX_COUNT = 140;

class CreateTweet extends React.Component {

  handleTextChange = (event) => {
    const input = event.target.value;
    this.props.setCount(MAX_COUNT - input.length);
    this.props.setBody(input);
  }
  countChars = (event) => {
    const input = event.target.value;
    this.props.setCount(MAX_COUNT - input.length);
  }

  handleSelection = (selectObj) => {
    this.props.setSelection(selectObj.value);
    //TODO Disable/enable date
  }

  handleSave = (event) => {
    event.preventDefault();
    this.props.saveTweet(this.props.tweet, this.props.userId);
    this.props.resetTweet();
  }

  render(){
    let selection = this.props.lists.map((list, index) => {
      return ({ value: list._id, label: list.title });
    });

    return (
      <div className='CreateTweet main-panel'>
        <h1 className='section-header'>Write a tweet</h1>
        <br/>
        <p>Publish your tweet at a specific time or add it to a list of tweets to be published at a specified interval.</p><br/>
        <div className='tweet-box'>
          <textarea autoFocus='true' placeholder='Enter a tweet' maxLength='140' rows='3' onChange={this.handleTextChange} value={this.props.tweetBody}></textarea>
          <br/><br/>
          <label>Date to post</label><br/>
          <DateField
            forceValidDate
            defaultValue={this.props.tweet.postDate}
            dateFormat="YYYY-MM-DD HH:mm">
            <TransitionView>
              <Calendar/>
            </TransitionView>
          </DateField>
          <br/><br/>
          <label>Add to list</label><br/>
          <Select
            value={this.props.selection}
            onChange={this.handleSelection}
            options={selection}
            clearable={false}
          />
          <div className='tweet-btn-container'>
              <span>{this.props.counter}</span><a href='#' className='submit-button' onClick={this.handleSave}>Save</a>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (this.props.selection === '0')
      this.props.setSelection(this.props.spList);
  }
}

const mapStateToProps = (state) => {
  return {
    userId:     state.userId,
    counter:    state.scheduledTweet.tweetCounter,
    selection:  state.scheduledTweet.selectedList,
    spList:     state.specialList,
    tweetBody:  state.scheduledTweet.body,
    postDate:   state.scheduledTweet.postDate,
    lists:      state.scheduledListArray,
    list:       state.scheduledList,
    tweet:      state.scheduledTweet
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      setCount:     (num) => dispatch(setCounter(num)),
      setSelection: (val) => dispatch(setSelectedList(val)),
      setBody:      (body) => dispatch(setScheduledTweetBody(body)),
      saveTweet:    (tweet, user) => dispatch(saveScheduledTweet(tweet, user)),
      resetTweet:   () => dispatch(resetScheduledTweet())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweet);
