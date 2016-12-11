import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DashboardLeft from './DashboardLeft';

export default class Dashboard extends React.Component {
  render(){
    return (
      <div className='Dashboard'>
        <DashboardLeft userId={this.props.params.userId}/>
      </div>
    );
  }
}
