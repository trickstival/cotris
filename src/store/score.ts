import { Module } from 'vuex'
import { rootState } from '.';


export const scoreState = () => ({
    score: 0,
    goal: '10',
    level: 1
})

export const score: Module<
    ReturnType<typeof scoreState>,
    ReturnType<typeof rootState>
> = {
    namespaced: true,
    state: scoreState,
    mutations: {
        increaseScore(state, by: number) {
          state.score += by;
        },
        resetScore(state) {
            state.score = 0
        },
        setGoal (state, goal: string) {
          state.goal = goal
        },
    }
}

