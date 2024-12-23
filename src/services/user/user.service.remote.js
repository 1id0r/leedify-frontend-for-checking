import { Password } from '@mui/icons-material'
import { httpService } from '../http.service'
import { User2Icon } from 'lucide-react'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  loginWithGoogle,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  saveLoggedinUser,
  getUsersStations,
  likeSong,
  dislikeSong,
  likeStation,
  dislikeStation,
  updateUsersLikedStation,
}

//crudl

function getUsers() {
  return httpService.get(`user`)
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  const user = await httpService.put(`user/${_id}`, { _id, score })

  const loggedinUser = getLoggedinUser()
  if (loggedinUser._id === user._id) saveLoggedinUser(user)
  return user
}

async function likeSong(song) {
  const user = await httpService.post('user/song', song)
  saveLoggedinUser(user)
  return user.likedSongs
}

async function dislikeSong(songId) {
  const user = await httpService.delete(`user/song/${songId}`)
  saveLoggedinUser(user)
  return user.likedSongs
}

async function getUsersStations(sortBy) {
	const {_id} = getLoggedinUser() 
	const stations = await httpService.get(`user/${_id}/station`,{sortBy})
	return stations
  }

async function likeStation(station) {
  const user = await httpService.post('user/station', station)
  saveLoggedinUser(user)
  return user.likedStations
}

async function dislikeStation(stationId) {
  const user = await httpService.delete(`user/station/${stationId}`)
  saveLoggedinUser(user)
  return user.likedStations
}

async function updateUsersLikedStation(station) {
  const res = await httpService.put('user/station', station)
  saveLoggedinUser(res.user)
  return res.station
}

//authentication

async function login(userCred) {
  try {
    const user = await httpService.post('auth/login', userCred)
    console.log('user', user)
    if (user) {
      saveLoggedinUser(user)
      return { success: true, user }
    } else {
      return {
        success: false,
        error: 'Login failed. Please try again.',
      }
    }
  } catch (err) {
    console.error('Login error:', err)
    if (err.response?.status === 401) {
      return {
        success: false,
        error: 'Invalid username or password',
      }
    } else {
      return {
        success: false,
        error: 'An error occurred. Please try again.',
      }
    }
  }
}

async function loginWithGoogle(googleUser) {
  try {
    const user = await httpService.post('auth/google', googleUser)
    if (user) return saveLoggedinUser(user)
  } catch (err) {
    console.error('Could not login with Google:', err)
    throw err
  }
}

async function signup(userCred) {
  try {
    const userToSave = {
      name: userCred.name || userCred.username,
      username: userCred.username,
      password: userCred.password,
      email: userCred.email,
      imgUrl: userCred.imgUrl || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
      likedSongs: [],
      likedStations: [],
    }

    const user = await httpService.post('auth/signup', userToSave)
    return saveLoggedinUser(user)
  } catch (err) {
    console.error('Could not signup:', err)
    throw err
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {

  user = {
    _id: user._id,
    username: user.username,
    name: user.name,
    imgUrl: user.imgUrl,
    likedSongs: user.likedSongs,
    likedStations: user.likedStations,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}
