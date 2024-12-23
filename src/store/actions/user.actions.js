import { userService } from '../../services/user'
import { store } from '../store'

import { showUserMsg } from '../../services/event-bus.service'
import {
  REMOVE_USER,
  SET_USER,
  SET_USERS,
  LIKE_SONG,
  DISLIKE_SONG,
  UPDATE_USER_LIKED_STATION,
} from '../reducers/user.reducer'
import { loadStations } from './station.actions'

export async function loadUsers() {
  try {
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (err) {
    console.log('UserActions: err in loadUsers', err)
  }
}

export async function removeUser(userId) {
  try {
    await userService.remove(userId)
    store.dispatch({ type: REMOVE_USER, userId })
  } catch (err) {
    console.log('UserActions: err in removeUser', err)
  }
}

export async function login(credentials) {
  try {
    const response = await userService.login(credentials)
    if (response.success) {
      store.dispatch({
        type: SET_USER,
        user: response.user,
      })
      return response
    } else {
      throw new Error(response.error)
    }
  } catch (err) {
    console.error('Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({
      type: SET_USER,
      user,
    })
    // socketService.login(user._id)
    return user
  } catch (err) {
    console.log('Cannot signup', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({
      type: SET_USER,
      user: null,
    })

    store.dispatch({ type: 'SET_STATIONS', stations: [] })
    store.dispatch({ type: 'CLEAR_CURRENT_SONG' })
    // socketService.logout()
  } catch (err) {
    console.log('Cannot logout', err)
    throw err
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId)
    store.dispatch({ type: SET_USER, user })
  } catch (err) {
    showUserMsg('Cannot load user')
    console.log('Cannot load user', err)
  }
}

export async function updateUsersLikedStation(station) {
    try {
      const updatedStation =await userService.updateUsersLikedStation(station)
      store.dispatch({ type: UPDATE_USER_LIKED_STATION, station: updatedStation })
      return updatedStation
    } catch (err) {
        showUserMsg('Cannot like song')
        console.log('Cannot like song', err)
    }
}

export async function likeSong(song) {
  try {
    const likedSongs = await userService.likeSong(song)
    store.dispatch({ type: LIKE_SONG, song })
    return likedSongs
  } catch (err) {
    showUserMsg('Cannot like song')
    console.log('Cannot like song', err)
  }
}

export async function dislikeSong(songId) {
  try {
    const likedSongs = await userService.dislikeSong(songId)
    store.dispatch({ type: DISLIKE_SONG, songId })
    return likedSongs
  } catch (err) {
    showErrorMsg('Cannot dislike song')
    console.log('Cannot dislike song', err)
  }
}
