import { routerRedux } from 'dva/router';
import { createAsset, getAssets } from '@/services/api';

export default {
  namespace: 'userAssets',

  state: {
    assets : undefined,
    assets_types : undefined
  },

  effects: {
    *createAsset( {payload}, {call, put}  ){
        console.log("createAsset model", payload)
        const response = yield call(createAsset, payload);
    },

    *getAssets( {payload}, {call, put}  ){
        console.log("getAssets model", payload)
        const response = yield call(getAssets, payload);
        console.log("getAssets model response", response);
        yield put({
            type: 'setAssets',
            payload: response,
        });
    },
  },

  reducers: {
    setAssets(state, { payload }) {
      console.log("setAccount reducer",payload);
      return {
        ...state,
        assets: payload.assets,
        assets_types: payload.types,
      };
    },
  },
};
