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
    reeivedAt: Data.now()
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
        Object.values(messages
            ).foreach(msg => dispatch(addMessage(msg)));
        dispatch(receivedMessages);
    }
}


export const updateMessageHeight = (event) => {
    const layout = event.nativeEvent.layout;
    return {
        type: 'UPDATE_MESSAGE_HEIGHT',
        height: layout.height
    }
}


export const login = () => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());
        firebase.auth(
            ).signInAnonymously(
            ).then(() => {
                dispatch(userAuthorized());
                dispatch(fetchMessages());
            });
    }
}

export const checkUserExists = () => {
    return function (dispatch) {
        dispatch(startAuthorizing());
        firebase.auth(
            ).signInAnonymously(
            ).then(() => firebase.database(
                ).ref(`users/${DeviceInfo.getUniqueID()}`
                ).once('value', (snapshot) => {
                    const val = snapshot.val();
                    if (val === null) {
                        dispatch(userNoExist());
                    } else{
                        dispatch(setUserName(val.name));
                        dispatch(setUserAvatar(val.avatar));
                    }
                })
            ).catch(err => console.log(err))
    }
}


export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});


export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});


export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
