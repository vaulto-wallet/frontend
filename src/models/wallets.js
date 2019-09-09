import { routerRedux } from 'dva/router';
import { getAddress, getAddresses, validateAddress} from '@/services/api';


export default {
  namespace: 'userWallets',

  state: {
    current_key : null,
    validated : {}
  },

  effects: {
    *setCurrentKey( {payload}, {call,put, dispatch} ){
      console.log("setCurrentKey", payload);
      yield put({
        type: 'setCurrentWallet',
        payload: payload,
      });
      yield put({
        type: 'getCurrentKeyInfo',
        payload: {},
      });

    },

    *getCurrentKeyInfo( {payload}, {call,put, select} ){
      console.log("getCurrentKeyInfo");
      const current_key = yield select(state => state.userWallets.current_key);

      console.log("getCurrentKeyInfo", current_key);
      const response = yield call(getAddresses, current_key);
      console.log("getCurrentKeyInfo", response);
      yield put({
        type: 'setCurrentWalletAddresses',
        payload: response,
      });
    },
    *getAddress( {payload}, {call, put}  ){
        console.log("getAddress model", payload)
        const response = yield call(getAddress, payload);
        console.log("getAddress model response", response);
        
        yield put({
          type: "getCurrentKeyInfo",
          payload : {}
        });
    },
    *validateAddress( {payload}, {call, put}  ){
      console.log("validateAddress model", payload)
      const response = yield call(validateAddress, payload);
      console.log("validateAddress model response", response);
      
      yield put({
        type: "setValidatedAddress",
        payload : response
      });
  },
},

  reducers: {
    setCurrentWallet(state, { payload }) {
      console.log("setCurrentWallet reducer",payload);
      return {
        ...state,
        current_key: payload,
      };
    },
    setCurrentWalletAddresses(state, { payload }) {
      console.log("setCurrentAddresses reducer",payload);
      return {
        ...state,
        addresses: payload.address,
      };
    },
    setValidatedAddress(state, { payload }) {
      console.log("setCurrentAddresses reducer",payload);
      return {
        ...state,
        validated: Object.assign(payload, state.validated),
      };
    },
  },
};
