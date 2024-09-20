import { defineStore } from 'pinia';

export const useTeamStore = defineStore('teamStore', {
    state: () => ({
        selectedTeam: localStorage.getItem('selectedTeam') || null,
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
});
