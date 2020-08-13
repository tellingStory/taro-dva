import * as indexApi from './service';

export default {
    namespace: 'index',
    state: {
        list:[]
    },

    effects: {
        * effectsDemo({ payload }, { call, put }) {
            const { status, data } = yield call(indexApi.demo, payload);
            if (status) {
                yield put({ type: 'save', payload: data });
            }
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, list:payload };
        },
    },

};
