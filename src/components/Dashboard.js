import React from 'react';
import DashboardLeft from './DashboardLeft';

export default class Dashboard extends React.Component {
  render(){
    return (
      <div className='Dashboard'>
        <DashboardLeft userId={this.props.params.userId}/>
        <div className="dashboard-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
