import React from 'react';
import NavBar from './NavBar';

export default function Layout(props) {
    return (
        <div className="app-container">
            <header>
                <NavBar />
            </header>
            <div className="app-body">
                <div className="app-content">
                    {props.children}
                </div>
            </div>
            <footer>
                <div className="footer-inner">
                    <p>
                        <strong>Brought to you by Chris Simmons.</strong>
                    </p>
                </div>
            </footer>
        </div>
    );
}
