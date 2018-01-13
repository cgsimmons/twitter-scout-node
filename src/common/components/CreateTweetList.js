import React from 'react';
import { connect } from 'react-redux';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import Select from 'react-select';
import { newScheduledList, setScheduledListTitle, setScheduledListStartDate, setScheduledListInterval, setScheduledListUserId } from '../actions/ScheduledListActions';


class CreateTweetList extends React.Component {
    componentDidMount() {
        this.props.setUserId(this.props.userId);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.saveList(this.props.list);
    }

    handleDate = (datestr, dateObj) => {
        this.props.setDate(dateObj.dateMoment._d);
    }

    handleInterval = (selectObj) => {
        this.props.setInterval(selectObj.value);
    }

    handleTitle = (event) => {
        this.props.setTitle(event.target.value);
    }

    handleCheck = () => {
        const newInterval = (this.props.list.interval === '' ? 'Day' : '');
        this.props.setInterval(newInterval);
      // if (newInterval === '') {
      //   this.props.setDate('');
      // } else {
      //   this.props.setDate(new Date());
      // }
    }

    render() {
        return (
          <div className="CreateTweetList main-panel">
            <h1 className="section-header">New List</h1>
            <br />
            <div className="tweet-box">
              <p>Create a list to organize tweets that should be
             automatically posted at a set interval.
              </p>
              <br />
              <div className="input-container">
                <label htmlFor="title">Title</label><br />
                <input onChange={this.handleTitle} value={this.props.list.title} type="text" className="tweet-input" autoFocus />
                <br />
                <label htmlFor="startDate">Start date</label><br />
                <DateField
                  updateOnDateClick
                  forceValidDate
                  onChange={this.handleDate}
                  defaultValue={this.props.list.startDate}
                  dateFormat="YYYY-MM-DD hh:mm a"
                  disabled={this.props.list.interval === ''}
                >
                  <TransitionView>
                    <Calendar />
                  </TransitionView>
                </DateField>
                <br /><br />
                <label htmlFor="interval">Once every</label>
                <Select
                  onChange={this.handleInterval}
                  value={this.props.list.interval}
                  options={[{ value: 'Day', label: 'Day' },
                              { value: 'Week', label: 'Week' },
                              { value: 'Month', label: 'Month' }]}
                  clearable={false}
                  disabled={this.props.list.interval === ''}
                  placeholder="Disabled"
                />
                <br />
                <label htmlFor="check">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="interval"
                    checked={this.props.list.interval === ''}
                    onChange={this.handleCheck}
                    value=""
                  />
                  <span className="checkbox-span">Set Each Tweet Manually</span>
                </label>
              </div>
              <div className="tweet-btn-container">
                <button className="submit-button" onClick={this.handleSubmit}>Add List</button>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.scheduledList,
        userId: state.userId,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveList: (list) => { dispatch(newScheduledList(list)); },
        setTitle: (title) => { dispatch(setScheduledListTitle(title)); },
        setDate: (date) => { dispatch(setScheduledListStartDate(date)); },
        setInterval: (interval) => { dispatch(setScheduledListInterval(interval)); },
        setUserId: (id) => { dispatch(setScheduledListUserId(id)); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweetList);
