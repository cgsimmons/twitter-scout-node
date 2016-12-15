import React from 'react';
import { connect } from 'react-redux';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import Select from 'react-select';
import { saveScheduledList, setScheduledListTitle, setScheduledListStartDate, setScheduledListInterval, setScheduledListUserId } from '../actions/ScheduledListActions';


class CreateTweetList extends React.Component {

handleSubmit = (event) => {
  event.preventDefault();
  this.props.saveList(this.props.list);
}

handleDate = (datestr, timeObj) => {
  this.props.setDate(timeObj.timestamp);
}

handleInterval = (selectObj) => {
  this.props.setInterval(selectObj.value);
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
          <p>Create a list to organize tweets that should be automatically posted at a set interval.</p>
        <br/>
            <div className='input-container'>
              <label>Title</label><br/>
              <input onChange={this.handleTitle} value={this.props.list.title} type='text' className='tweet-input'/>
              <br/>
              <label>Once every</label>
              <Select onChange={this.handleInterval}
                value={this.props.list.interval}
                options={[{value: "Day",   label: "Day"},
                          {value: "Week",  label: "Week"},
                          {value: "Month", label: "Month"}]}
                clearable={false}/>
              <br/>
              <label>Start date</label><br/>
              <DateField
                forceValidDate
                onChange={this.handleDate}
                defaultValue={this.props.list.startDate}
                dateFormat="YYYY-MM-DD hh:mm a">
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
