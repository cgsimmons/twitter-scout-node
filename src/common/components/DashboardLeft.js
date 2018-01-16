import React from 'react';
import User from './User';
import Sidebar from './Sidebar';

export default function DashboardLeft(props) {
    return (
        <div className="DashboardLeft">
            <User userId={props.userId} />
            <Sidebar userId={props.userId} />
        </div>
    );
}
