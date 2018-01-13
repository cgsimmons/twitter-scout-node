const INITIAL_TWEET_STATE = {
    body: '',
    posted: false,
    postDate: new Date(),
    selectedList: '0',
    tweetCounter: 140,
};

export default function scheduledTweet(state = INITIAL_TWEET_STATE, action) {
    switch (action.type) {
    case 'SET_SCHEDULED_TWEET':
        return { ...state, ...action.tweet };
    case 'SET_COUNTER':
        return { ...state, tweetCounter: action.count };
    case 'SET_SCHEDULED_TWEET_BODY':
        return { ...state, body: action.body };
    case 'SET_SELECTED_LIST':
        return { ...state, selectedList: action.selection };
    case 'RESET_SCHEDULED_TWEET':
        return { ...state, ...INITIAL_TWEET_STATE };
    case 'SET_SCHEDULED_TWEET_POSTDATE':
        return { ...state, postDate: action.date };
    default:
        return state;
    }
}
