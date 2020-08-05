import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        'API-KEY': '7b9235d0-5a62-43ca-915d-98f1326304af'
    }
})

export const messagesAPI = {
    fetchDialogs() {
        return instance
            .get(`/dialogs`)
            .then(r => r.data)
    },
    fetchMessages(chatID) {
        return instance
            .get(`/dialogs/${chatID}/messages`)
            .then(r => r.data)
    },
    sendMessage(chatID, text) {
        return instance
            .post(`/dialogs/${chatID}/messages`, {body: text})
            .then(r => r.data)
    }
}

export const usersAPI = {
    fetchUsers(currentPage = 1, pageSize = 10, searchInput = "", friend= true) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}${searchInput !== "" ? `&term=${searchInput}` : ""}${friend ? '&friend=true' : ''}`).then(r => r.data)

    },
    checkFollow(id){
        return id && instance
            .get(`follow/${id}`).then(r=>r.data)
    },
    follow(id){
        return id && instance
            .post(`follow/${id}`).then(r=>r.data)
    },
    unfollow(id){
        return id && instance
            .delete(`follow/${id}`).then(r=>r.data)
    },
}

export const profileAPI = {
    fetchProfile(id = null, myId = 2) {
        return instance.get(`profile/${id !==null ? id : myId}`).then(r => r.data)
    },
    uploadProfilePicture(file) {
        return instance.put('profile/photo', file, {headers: {'Content-Type': 'multipart/form-data'}})
    }
}