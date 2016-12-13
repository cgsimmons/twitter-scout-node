import React from 'react';

export default class ScheduledList extends React.Component {


  render(){
    return (

      <div className='ScheduledList dashboard-panel main-panel'>
        <h3>{this.props.list.title}</h3>
        <span className="ReactTags__tag">
          <a className="ReactTags__remove delete">×</a>
        </span>
        <p>{this.props.list.interval.replace('y', 'i')}ly from {this.props.list.startDate.slice(0,10)}</p>
        <hr/>

      </div>
    );
  }
}
