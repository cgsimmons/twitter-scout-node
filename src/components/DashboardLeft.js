import React from 'react';
import User from './User';
import Sidebar from './Sidebar';

export default class DashboardLeft extends React.Component {
  render(){
    return (
      <div className='DashboardLeft'>
        <User userId={this.props.userId}/>
        <Sidebar />
      </div>
    );
  }
}
