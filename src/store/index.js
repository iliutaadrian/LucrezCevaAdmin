import { getLocalUser } from '../components/helpers/general';

const userLocal = getLocalUser();

export default {
    state: {
        user: userLocal

    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {
        login(state, payload) {
            localStorage.setItem("user", JSON.stringify(payload));
            state.user = payload;
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
};