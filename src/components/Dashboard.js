import React from 'react';
import DashboardLeft from './DashboardLeft';
import { connect } from 'react-redux';
import { setUserId } from '../actions/UserActions';

class Dashboard extends React.Component {
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
  componentDidMount(){
    this.props.setUserId(this.props.params.userId);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserId: (id) => dispatch(setUserId(id))
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
