export function getToken() {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (!token || !expirationTime) {
        return null;
    }
    const now = new Date().getTime();
    if (now > expirationTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return null;
    }

    return token;
}