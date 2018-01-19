import {combinedReducers} from 'redux';

import chatroom from './chatroom';
import user from './user';

const rootReducer = combinedReducers({
    chatroom,
    user
});

export default rootReducer;
