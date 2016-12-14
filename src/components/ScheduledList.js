import React from 'react';
import { connect } from 'react-redux';
import { removeAndDeleteScheduledListArray } from '../actions/ScheduledListActions';

class ScheduledList extends React.Component {

  handleDelete = (event) => {
    // this.props.deleteList(this.props.list.title);
    this.props.deleteList(this.props.list);
  }

  render(){
    return (

      <div className='ScheduledList dashboard-panel main-panel'>
        <h3>{this.props.list.title}</h3>
        <span className="ReactTags__tag">
          <a className="ReactTags__remove delete" onClick={this.handleDelete}>×</a>
        </span>
        <p>{this.props.list.interval.replace('y', 'i')}ly from {this.props.list.startDate.slice(0,21)}</p>
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
