const remoteURL = "http://localhost:5002"

export default {
    getAll(endpoint) {
        return fetch(`${remoteURL}/${endpoint}`).then(r => r.json())
    },

    getAllUserInfo() {
        return fetch(`${remoteURL}/users/?_embed=appointments&_embed=symptoms&_embed=medications`).then(r => r.json())
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
    postTrackedSymptom(newTrackedSymptom) {
        return fetch(`${remoteURL}/trackedSymptoms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrackedSymptom)
        }).then(r => r.json())
    },

    checkForUser(email) {
        return fetch(`${remoteURL}/users?email=${email}`).then(r => r.json())
    },

    delete(id, dataset) {
        return fetch(`${remoteURL}/${dataset}/${id}`, {
            method: "DELETE"
        }).then(r => r.json())
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
        return fetch(`${remoteURL}/medications/${id}`, {
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
        return fetch(`${remoteURL}/appointments/?_embed=notes`).then(r => r.json())
    },

    putAppointment(id, newObject) {
        return fetch(`${remoteURL}/appointments/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(r => r.json())
    },

    getAptDoc() {
        return fetch(`${remoteURL}/appointments/?_expand=doctor`).then(r => r.json())
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

    getAllTreatmentInfo() {
        return fetch(`${remoteURL}/treatments?_expand=medication&_expand=treatmentSymptom&_expand=appointment&_expand=user`).then(r=>r.json())
    },
    postNewTreatment(newTreatment) {
        return fetch(`${remoteURL}/treatments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTreatment)
        }).then(r => r.json())
    },
    deleteTreatment(id) {
        return fetch(`${remoteURL}/treatments/${id}`, {
            method: "DELETE"
        }).then(r => r.json())
    },
    postNewTreatmentSymptom(newTreatmentSymptom) {
        return fetch(`${remoteURL}/treatmentSymptoms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTreatmentSymptom)
        }).then(r => r.json())
    }
}
