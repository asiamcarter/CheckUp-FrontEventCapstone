const remoteURL = "http://localhost:5002"

export default  {
    getAll(endpoint) {
        return fetch (`${remoteURL}/${endpoint}`).then(r=>r.json())

    },

    postUser(newUser) {
        return fetch (`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(r => r.json())
    },

    registerUser(username, password) {
        return fetch(`${remoteURL}/users?userName=${username}&password=${password}`).then(r => r.json())
    }

}