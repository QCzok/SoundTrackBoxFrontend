import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiConstants';

//https://reactjs.org/docs/code-splitting.html
export const addSongPost = async (playlistName, playlistID, songName, selectedFile) => {

    const data = new FormData()
    data.append('playlistName', playlistName);
    data.append('playlistID', playlistID);
    data.append('songName', songName);
    data.append('track', selectedFile);

    return axios.post(API_BASE_URL + '/media/addSong', data, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
        .then(function (response) {
            if (response.status === 200) {
                return response.data.affected;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const deleteSongPost = async (playlistID, songID) => {
    return axios.post(API_BASE_URL + '/media/deleteSong', { playlistID: playlistID, songID: songID }, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
        .then(function (response) {
            if (response.status === 200) {
                return response.data.affected;
            }
        }
        )
        .catch(function (error) {
            console.log(error);
        })
}

export const addPlaylistPost = async (playlistName) => {
    return axios.post(API_BASE_URL + '/media/addPlaylist', { name: playlistName }, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
        .then(function (response) {
            if (response.status === 200) {
                return response.data.affected;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const deletePlaylistPost = async (playlistID) => {
    return axios.post(API_BASE_URL + '/media/deletePlaylist', { playlistID: playlistID }, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
        .then(function (response) {
            if (response.status === 200) {
                return response.data.affected;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const loadMusicCollectionGet = async () => {
    var data = axios.get(API_BASE_URL + '/media/loadMusicCollection', { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
        .then(res => { return res.data }).catch(function (error) {
            console.log(error);
        })
    return data;
}

export const registrationToServerPost = async (payload) => {
    return axios.post(API_BASE_URL + '/user/register', payload)
        .then((response) => {
            if (response.status === 200) {
                return { isOk: true, message: "" };
            } else {
                return { isOk: false, message: response.data };
            }
        })
        .catch(function (error) {
            return { isOk: false, message: error.response.data };
        });
}

export const loginPost = async (payload) => {
    return axios.post(API_BASE_URL + '/user/login', payload)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw(error);
        });
}