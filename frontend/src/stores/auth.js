import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        tokenExpiration: null,
        isAuthenticated: false
    }),
    actions: {
        setToken(token, expirationDuration = 3600) {
            this.token = token;
            this.tokenExpiration = Math.floor(Date.now() / 1000) + expirationDuration;
            this.isAuthenticated = true;
        },
        logout() {
            this.token = null;
            this.tokenExpiration = null;
            this.isAuthenticated = false;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
