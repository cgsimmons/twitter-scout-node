import React from 'react';

const Login = () => {
  return (
    <div className="Login">
      <div className="logo-box">
        <h1 className="logo-title">Sign-in</h1>
        <img className="logo login" src="/img/twitter_sm.jpg" alt="Twitter" />
      </div>
      <h3>Twitter Scout requires Twitter authentication.</h3>
      <a href="/auth/twitter" className="submit-button">Sign in with Twitter</a>
    </div>
  );
};

export default Login;
