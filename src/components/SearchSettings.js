import React from 'react';
import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { addUserTag, removeUserTag, setUserTags, userUpdateTags } from '../actions/UserActions';


class SearchSettings extends React.Component {
  cancelTags = () => {
    if(typeof this.props.user.tags !== 'undefined'){
      this.props.setUserTags(this.props.user.tags);
    } else {
      this.props.setUserTags([]);
    }
  };

  updateTags = () => {
      this.props.updateUserTags(this.props.user._id, this.props.userTags);
  };

  render(){
    // let tags = this.state.tags;
    let tags = this.props.userTags;
    let placeholder = 'Add a keyword...';
    return (
      <div className='SearchSettings dashboard-panel main-panel'>
        <h1 className='section-header'>Search Words</h1>
        <br/>
        <p>Enter keywords to help Twitter Scout find relevent tweeters and tweets for you.</p>
        <br/>
        <div>
          <ReactTags tags={tags}
            handleDelete={this.props.removeTag}
            handleAddition={this.props.addTag}
            autofocus={true}
            placeholder={placeholder}
          />
        </div>
        <div className='search-buttons'>
          <button onClick={this.updateTags}>Save</button>
          <button onClick={this.cancelTags}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user:     state.user,
    userTags: state.userTags
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      removeTag: (tag) => dispatch(removeUserTag(tag)),
      addTag: (tag) => dispatch(addUserTag(tag)),
      setUserTags: (tags) => dispatch(setUserTags(tags)),
      updateUserTags: (id, tags) => dispatch(userUpdateTags(id, tags))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSettings);
