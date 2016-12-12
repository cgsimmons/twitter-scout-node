import React from 'react';
import { connect } from 'react-redux';
import { setCounter } from '../actions/TweetActions';

const MAX_COUNT = 140;

class ScheduledTweets extends React.Component {

  countChars = (event) => {
    const input = event.target.value;
    this.props.setCount(MAX_COUNT - input.length);
  }

  render(){
    return (
      <div className='ScheduledTweets dashboard-panel main-panel'>
        <h1 className='section-header'>Write a tweet</h1>
        <div className='tweet-box'>
          <textarea autoFocus='true' placeholder='Enter a tweet' maxLength='140' rows='3' onChange={this.countChars}></textarea>
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
    counter: state.tweetCounter
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      setCount: (num) => dispatch(setCounter(num))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledTweets);
