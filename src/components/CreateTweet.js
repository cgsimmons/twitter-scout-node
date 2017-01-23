import React from 'react';
import { connect } from 'react-redux';
import { resetScheduledTweet, setCounter, setSelectedList, setScheduledTweetBody, setScheduledTweetPostDate } from '../actions/TweetActions';
import { saveScheduledTweet } from '../actions/ScheduledListActions';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import Select from 'react-select';

const MAX_COUNT = 140;

class CreateTweet extends React.Component {

  handleText = (event) => {
    let input = event.target.value;
    this.props.setCount(MAX_COUNT - input.length);
    this.props.setBody(input);
  }

  handleDate = (datestr, dateObj) => {
    this.props.setDate(dateObj.dateMoment._d);
  }

  handleSelection = (selectObj) => {
    this.props.setSelection(selectObj.value);
    for(let i = 0; i < this.props.lists.length - 1; i++){
      if((selectObj.startDate !== '') && (this.props.lists[i]._id === selectObj.value)){
        let newDate = new Date(this.props.lists[i].startDate);
        switch(this.props.lists[i].interval){
          case 'Day':
            newDate.setDate(newDate.getDate() + this.props.lists[i].tweets.length);
            break;
          case 'Week':
            console.log(newDate.getDate() + (this.props.lists[i].tweets.length * 7));
            newDate.setDate(newDate.getDate() + (this.props.lists[i].tweets.length * 7));
            break;
          case 'Month':
            newDate.setMonth(newDate.getMonth() + this.props.lists[i].tweets.length);
            break;
        }
        this.props.setDate(newDate);
        return;
      }
    }
    this.props.setDate(new Date());
  }

  handleSave = (event) => {
    event.preventDefault();
    this.props.saveTweet(this.props.tweet, this.props.userId);
    this.props.setBody('');
  }

  disableDate = ()=>{

  }

  render(){
    let selections = this.props.lists.map((list, index) => {
      if (this.props.selection === '0'){
        this.props.setSelection(list._id);
      }
      return ({ value: list._id, label: list.title, startDate: list.startDate });
    });
    let disableDate = false;
    if (this.props.lists.length > 0) {
      let result = this.props.lists.filter((list)=>{return list._id === this.props.selection;})
      if (result.length > 0) {
        if(result[0].interval !== ''){
          disableDate = true;
        }
      }
      else {
        this.props.setSelection(this.props.lists[0]._id);
      }
    }

    return (
      <div className='CreateTweet main-panel'>
        <h1 className='section-header'>Write a Tweet</h1>
        <br/>
        <p>Publish your tweet at a specific time or add it to a list of tweets to be published at a specified interval.</p><br/>
        <div className='tweet-box'>
          <textarea autoFocus='true' placeholder='Enter a tweet...' maxLength='140' rows='3' onChange={this.handleText} value={this.props.tweetBody}></textarea>
          <br/><br/>
          <label>Date to post</label><br/>
          <DateField
            forceValidDate
            value={this.props.tweetDate}
            onChange={this.handleDate}
            dateFormat="YYYY-MM-DD hh:mm a"
            disabled={disableDate}>
            <TransitionView>
              <Calendar/>
            </TransitionView>
          </DateField>
          <br/><br/>
          <label>Add to list</label><br/>
          <Select
            placeholder='No lists available'
            value={this.props.selection}
            onChange={this.handleSelection}
            options={selections}
            clearable={false}
          />
          <div className='tweet-btn-container'>
              <span>{this.props.counter}</span><a href='#' className='submit-button' onClick={this.handleSave}>Save</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId:     state.userId,
    tweet:      state.scheduledTweet,
    counter:    state.scheduledTweet.tweetCounter,
    selection:  state.scheduledTweet.selectedList,
    tweetBody:  state.scheduledTweet.body,
    tweetDate:  state.scheduledTweet.postDate,
    lists:      state.scheduledListArray
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      setCount:     (num) => dispatch(setCounter(num)),
      setSelection: (val) => dispatch(setSelectedList(val)),
      setBody:      (body) => dispatch(setScheduledTweetBody(body)),
      setDate:      (date) => dispatch(setScheduledTweetPostDate(date)),
      saveTweet:    (tweet, user) => dispatch(saveScheduledTweet(tweet, user)),
      resetTweet:   () => dispatch(resetScheduledTweet())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweet);
