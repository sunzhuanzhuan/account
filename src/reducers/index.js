import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import commonReducers from './common'
import authReducers from '../auth/reducers'
import loginReducer from '../login/reducer/index'
import siderMenuReducer from '../siderMenu/reducers'
import authorizationsReducers from './authorizations'
import accountManageReducer from '../accountManage/reducer';
import exportTemplateReducer from '../components/exportTemplate/reducer'
import accountDetailReducer from "../accountDetail/reducer";
import pricePolicyReducer from '../policyManage/reducer';
import ownerManageReducer from '../ownerManage/reducer';


export default combineReducers({
  commonReducers,
  routing: routerReducer,
  auth: authReducers,
  loginReducer,
  siderMenuReducer,
  authorizationsReducers,
  accountManageReducer,
  exportTemplateReducer,
  accountDetailReducer,
  pricePolicyReducer,
  ownerManageReducer
});
