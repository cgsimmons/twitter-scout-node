import React from 'react';

export default class ScheduledList extends React.Component {

  render(){
    return (
      <div className='ScheduledList dashboard-panel main-panel'>
        <p>{this.props.list.interval}</p>
      </div>
    );
  }
}
