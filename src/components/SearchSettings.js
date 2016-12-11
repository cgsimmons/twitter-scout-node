import React from 'react';

export default class SearchSettings extends React.Component {
  render(){

    return (
      <div className='SearchSettings dashboard-panel main-panel'>
        <h1 className='section-header'>Search Words</h1>
        <p>Enter keywords to help Twitter Scout find relevent tweeters and tweets for you.</p>
      </div>
    );
  }
}
