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
    },

    postMedicaton(newMedication) {
        return fetch(`${remoteURL}/medications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMedication)
        }).then(r => r.json())

    },

    putMedication(id, newObject) {
        return fetch (`${remoteURL}/medications/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(r => r.json())
    },

    getById(id, dataset) {
        return fetch(`${remoteURL}/${dataset}/${id}`).then(r => r.json())
    },

    postAppointment(newAppointment) {
        return fetch(`${remoteURL}/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAppointment)
        }).then(r => r.json())
    },
    getAllAptNotes() {
        return fetch(`${remoteURL}/appointments/?_embed=notes`).then(r =>r.json())
    },

    putAppointment(id, newObject) {
        return fetch (`${remoteURL}/appointments/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(r => r.json())
    },

    getAptDoc() {
        return fetch(`${remoteURL}/appointments/?_expand=doctor`).then(r =>r.json())
    },

    postNewDoctor(newDocotor) {
        return fetch(`${remoteURL}/doctors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDocotor)
        }).then(r => r.json())

    },

    getAppointmentNotes(appointmentId) {
        return fetch(`${remoteURL}/appointments/${appointmentId}/?_embed=notes`).then(r=>r.json())
    },
    getAllAppointmentNotes() {
        return fetch(`${remoteURL}/appointments/?_expand=note`).then(r=>r.json())
    },
    postNewNote(newNote) {
        return fetch(`${remoteURL}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        }).then(r => r.json())

    }
}
