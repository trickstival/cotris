import { rootState } from '.';
import { Module } from 'vuex';

export const authState = () => ({
    currentUser: null as firebase.User | null
});
  
export const auth: Module<
    ReturnType<typeof authState>,
    ReturnType<typeof rootState>
> = {
    namespaced: true,
    state: authState,
    mutations: {
        setCurrentUser (state, currentUser: firebase.User | null) {
            state.currentUser = currentUser
        }
    }
}