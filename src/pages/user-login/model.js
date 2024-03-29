import { routerRedux } from 'dva/router';
import { getPageQuery } from './utils/utils';
import { setAuthority, setSessionKey } from './utils/authority';
import { reloadAuthorized } from './utils/Authorized';
import { accountLogin, getFakeCaptcha } from './service';

export default {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if(response.key){
        response.currentAuthority = "admin";
        response.status = "ok";
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log("Change login status",payload);
      setAuthority(payload.currentAuthority);
      setSessionKey(payload.key);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
