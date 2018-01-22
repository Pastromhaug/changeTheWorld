import firebase from '../firebase';


export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});


export const sendMessage = (text, user) => {
    return function(dispatch) {
        let msg = {
            text: text,
            time: Date.now(),
            author: {
                name: user.name,
                avatar: user.avatar
            }
        };

        const newMsgRef = firebase.database(
            ).ref('messages'
            ).push();

        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    };
};


export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});


export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});


export const fetchMessages = () => {
    return function(dispatch) {
        dispatch(startFetchingMessages());
        firebase.database(
            ).ref('messages'
            ).orderByKey(
            ).limitToLast(20
            ).on('value', (snapshot) => {
                setTimeout(() => {
                    const messages = snapshot.val() || []
                    dispatch(receiveMessages(messages))
                });
            });
    }
}


export const receiveMessages = (messages) => {
    return function(dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));
        dispatch(receivedMessages());
    }
}


export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;
    return {
        type: 'UPDATE_MESSAGE_HEIGHT',
        height: layout.height
    }
}



//
// User actions
//


export const setUserName = (name) => ({
    type: 'SET_USER_NAME',
    name
});

export const setUserAvatar = (avatar) => ({
    type: 'SET_USER_AVATAR',
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});


export const login = () => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());
        console.log('startAuthorizing');
        firebase.auth(
            ).signInAnonymously()
             .then((resp) => {
                dispatch(userAuthorized());
                dispatch(fetchMessages());
            });
    }
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});


export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});


export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});


export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
