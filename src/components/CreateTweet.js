import React from 'react';
import { connect } from 'react-redux';
import { setCounter, setSelectedList } from '../actions/TweetActions';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import Select from 'react-select';

const MAX_COUNT = 140;

class CreateTweet extends React.Component {

  countChars = (event) => {
    const input = event.target.value;
    this.props.setCount(MAX_COUNT - input.length);
  }

  handleSelection = (value) => {
    this.props.setSelection(value);
    //TODO Disable/enable date
  }

  handleSave = (event) => {

  }

  render(){
    let selection = this.props.lists.map((list, index) => {
      return ({ value: list.title, label: list.title });
    });
    let isDisabled = (this.props.selection === 'Special Tweets' ? '' : 'disabled');
    return (
      <div className='CreateTweet main-panel'>
        <h1 className='section-header'>Write a tweet</h1>
        <br/>
        <p>Publish your tweet at a specific time or add it to a list of tweets to be published at a specified interval.</p><br/>
        <div className='tweet-box'>
          <textarea autoFocus='true' placeholder='Enter a tweet' maxLength='140' rows='3' onChange={this.countChars}></textarea>
          <br/><br/>
          <label>Date to post</label><br/>
          <DateField
            forceValidDate
            defaultValue={"2016-05-30 15:23"}
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
            options={[{value: 'Special Tweets', label: 'Special Tweets'}, ...selection]}
            clearable={false}
          />
          <div className='tweet-btn-container'>
              <span>{this.props.counter}</span><button onClick={this.handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter:    state.tweetCounter,
    selection:  state.selectedList,
    lists:      state.scheduledListArray,
    list:       state.scheduledList
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      setCount: (num) => dispatch(setCounter(num)),
      setSelection: (val) => dispatch(setSelectedList(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweet);
