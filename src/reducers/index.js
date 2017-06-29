import { combineReducers } from 'redux'

import user from './user'
import albums from './albums'
import friends from './friends'

export default combineReducers({
	user,
	albums,
	friends,
})