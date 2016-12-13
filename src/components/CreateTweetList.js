import React from 'react';
import { connect } from 'react-redux';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import { saveScheduledList, setScheduledListTitle, setScheduledListStartDate, setScheduledListInterval, setScheduledListUserId } from '../actions/ScheduledListActions';


class CreateTweetList extends React.Component {

handleSubmit = (event) => {
  event.preventDefault();
  this.props.saveList(this.props.list);
}

handleDate = (datestr, {datemon, timestamp}) => {
  this.props.setDate(datestr);
}

handleInterval = (event) => {
  this.props.setInterval(event.target.value);
}

handleTitle = (event) => {
  this.props.setTitle(event.target.value);
}

  render(){
    return (
      <div className='CreateTweetList main-panel'>
        <h1 className='section-header'>New List</h1>
        <br/>
        <div className='tweet-box'>
          <p>Create a list to organize tweets that should be released on a set inteval.</p>
        <br/>
            <div className='input-container'>
              <label>Title</label>
              <input onChange={this.handleTitle} value={this.props.list.title} type='text' className='tweet-input'/>
              <br/><br/>
              <label>Once every</label>
              <select onChange={this.handleInterval} value={this.props.list.interval}>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
              </select>
              <br/><br/>
              <DateField
                forceValidDate
                onChange={this.handleDate}
                defaultValue={this.props.list.startDate}
                dateFormat="YYYY-MM-DD HH:mm a">
                <TransitionView>
                  <Calendar/>
                </TransitionView>
              </DateField>
            </div>
          <div className='tweet-btn-container'>
            <button onClick={this.handleSubmit}>Add List</button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.setUserId(this.props.userId)
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.scheduledList,
    userId: state.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveList: (list) => dispatch(saveScheduledList(list)),
    setTitle: (title) => dispatch(setScheduledListTitle(title)),
    setDate: (date) => dispatch(setScheduledListStartDate(date)),
    setInterval: (interval) => dispatch(setScheduledListInterval(interval)),
    setUserId: (id) => dispatch(setScheduledListUserId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweetList);
