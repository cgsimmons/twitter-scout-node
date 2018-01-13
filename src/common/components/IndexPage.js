import React from 'react';

const IndexPage = () => {
    return (
      <div className="home">
        <h1 className="logo-title">Twitter Scout</h1>
        <p className="logo-tagline">twitter management made easy</p>
        <a href="/auth/twitter" className="submit-button under-logo">Sign in with Twitter</a>
        <div className="logo-box">
          <img className="logo" src="/img/scope2_sm.jpg" alt="Logo" />
        </div>
      </div>
    );
};

export default IndexPage;
