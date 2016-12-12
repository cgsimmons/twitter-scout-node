import React from 'react';
import { connect } from 'react-redux';
import { setCounter } from '../actions/TweetActions';

export default class CreateTweetList extends React.Component {

  render(){
    return (
      <div className='CreateTweetList dashboard-panel main-panel'>
        <h1 className='section-header'>New List</h1>
        <br/>
        <div className='tweet-box'>
          <p>Create a list to organize tweets that should be released on a set inteval.</p>
        <br/>
          <form onSubmit={this.handleSubmit}>
            <label>Once every</label>
            <select>
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
            </select>
          <div className='tweet-btn-container'>
              <button>Save</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     counter: state.tweetCounter
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//     return {
//       setCount: (num) => dispatch(setCounter(num))
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(ScheduledTweets);
