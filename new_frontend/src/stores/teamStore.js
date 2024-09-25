import { defineStore } from 'pinia';

export const useTeamStore = defineStore('teamStore', {
    state: () => ({
        selectedTeam: null,
    }),
    actions: {
        setSelectedTeam(teamId) {
            this.selectedTeam = teamId;
            localStorage.setItem('selectedTeam', teamId);
        },
    },
    getters: {
        getSelectedTeam: (state) => state.selectedTeam,
    },
    persist: {
        storage: sessionStorage,
    },
});
