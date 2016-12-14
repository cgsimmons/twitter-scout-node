import React from 'react';
import { connect } from 'react-redux';
import { setCounter } from '../actions/TweetActions';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import Select from 'react-select';


const MAX_COUNT = 140;

class CreateTweet extends React.Component {

  countChars = (event) => {
    const input = event.target.value;
    this.props.setCount(MAX_COUNT - input.length);
  }

  render(){
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
            value={"Special Posts"}
            options={[{value: 'Special Posts', label: 'Special Posts'}]}
            clearable={false}
          />
          <div className='tweet-btn-container'>
              <span>{this.props.counter}</span><button>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.tweetCounter,
    lists:    state.scheduledListArray
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      setCount: (num) => dispatch(setCounter(num))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweet);
