import React from 'react';
import { connect } from 'react-redux';
import { removeAndDeleteScheduledListArray } from '../actions/ScheduledListActions';
import moment from 'moment';

class ScheduledList extends React.Component {

  handleDelete = (event) => {
    // this.props.deleteList(this.props.list.title);
    this.props.deleteList(this.props.list);
  }

  render(){
    let message;
    if (this.props.list.title === 'Special Tweets'){
      message = <p>Tweets will each be posted according to their individually set times.</p>;
    } else {
      message = <p>{this.props.list.interval.replace('y', 'i')}ly from {moment(this.props.list.startDate).format("MMM Do YYYY, h:mm a")}</p>;
    }

    return (

      <div className='ScheduledList dashboard-panel main-panel'>
        <h3>{this.props.list.title}</h3>
        <span className="ReactTags__tag">
          <a className="ReactTags__remove delete" onClick={this.handleDelete}>×</a>
        </span>
        {message}
        <hr/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (list) => dispatch(removeAndDeleteScheduledListArray(list)),
  };
};

export default connect(null, mapDispatchToProps)(ScheduledList);
