let idUser = null;
let idName = null;

function setIdUser(id) {
    idUser = id;
}

function getIdUser() {
    return idUser;
}

function setUserName(name) {
    idName = name;
}

function getUserName() {
    return idName;
}

module.exports = { setIdUser, getIdUser, setUserName, getUserName };