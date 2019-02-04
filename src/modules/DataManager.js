const remoteURL = "http://localhost:5002"

export default {
    getAll(endpoint) {
        return fetch(`${remoteURL}/${endpoint}`).then(r => r.json())

    },

    postUser(newUser) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(r => r.json())
    },
    postSymptom(newSymptom) {
        return fetch(`${remoteURL}/symptoms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSymptom)
        }).then(r => r.json())

    },

    checkForUser(email, password) {
        return fetch(`${remoteURL}/users?email=${email}&password=${password}`).then(r => r.json())
    },

    delete(id, dataset) {
        return fetch (`${remoteURL}/${dataset}/${id}`, {
            method: "DELETE"}).then(r => r.json())
    }
}