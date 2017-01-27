import React from 'react';
import { connect } from 'react-redux';
import DashboardLeft from './DashboardLeft';
import { setUserId } from '../actions/UserActions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.setUserId(this.props.params.userId);
  }

  render() {
    return (
      <div className="Dashboard">
        <DashboardLeft userId={this.props.params.userId} />
        <div className="dashboard-main">
          {this.props.children}
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserId: (id) => { dispatch(setUserId(id)); },
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
