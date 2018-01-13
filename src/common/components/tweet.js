import React from 'react';
// import $ from 'jquery';


export default class Tweet extends React.Component {
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     markup: ''
    //   }
    // }
    // componentDidMount(){
    //   this.getMarkup(this.props.tweetId);
    // }
    // getMarkup(id) {
    // if (id) {
    //   $.ajax({
    //     // url: `https://publish.twitter.com/oembed?id=${id}`,
    //     url: `https://api.twitter.com/1.1/statuses/oembed.json?id=${id}`,
    //     success: (newMarkup) => {
    //       console.log('SUCCESS');
    //       this.setState({markup: newMarkup.html})
    //     }
    //   })
    // }
    // }
    render() {
        return (
          <div className="Tweet">
            <h1>{this.props.tweetId}</h1>
            {this.state.markup}
          </div>
        );
    }
}
