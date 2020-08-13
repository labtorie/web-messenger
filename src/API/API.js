import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        // labtorie
        // 'API-KEY': '7b9235d0-5a62-43ca-915d-98f1326304af'
        // poop sock
        'API-KEY': 'aaf01db3-6045-46f6-9014-316ea841444d'
    }
})

export const messagesAPI = {
    fetchDialogs() {
        return instance
            .get(`/dialogs`)
            .then(r => r.data)
    },
    fetchMessages(chatID, pageSize, page = 1) {
        return instance
            .get(`/dialogs/${chatID}/messages?count=${pageSize}&page=${page}`)
            .then(r => r.data)
    },
    sendMessage(chatID, text) {
        return instance
            .post(`/dialogs/${chatID}/messages`, {body: text})
            .then(r => r.data)
    }
}

export const usersAPI = {
    fetchUsers(currentPage = 1, pageSize = 10, searchInput = "", friend = true) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}${searchInput !== "" ? `&term=${searchInput}` : ""}${friend ? '&friend=true' : ''}`).then(r => r.data)

    },
    checkFollow(id) {
        return id && instance
            .get(`follow/${id}`).then(r => r.data)
    },
    follow(id) {
        return id && instance
            .post(`follow/${id}`).then(r => r.data)
    },
    unfollow(id) {
        return id && instance
            .delete(`follow/${id}`).then(r => r.data)
    },
}

export const profileAPI = {
    fetchProfile(id = null) {
        return id && instance.get(`profile/${id}`).then(r => r.data)
    },
    uploadProfilePicture(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    updateProfileInfo(name, bio) {
        let payload = {
            aboutMe: bio,
            contacts: {
                facebook: null,
                github: null,
                instagram: null,
                mainLink: null,
                twitter: null,
                vk: null,
                website: null,
                youtube: null
            },
            lookingForAJob: false,
            lookingForAJobDescription: 'null',

            fullName: name,
        }
        return instance.put('profile', payload).then(r => r.data)
    }
}

export const authAPI = {
    fetchAuth() {
        return instance
            .get(`auth/me`).then(r => r.data)
    },
    logIn(email, password) {
        return instance
            .post(`auth/login`, {email, password})
            .then(r => r.data)
    },
    logOut() {
        return instance
            .delete(`auth/login`)
            .then(r => r.data)
    }
}