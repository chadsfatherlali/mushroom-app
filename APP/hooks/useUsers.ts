import { useState, useEffect } from 'react'

import axios from 'axios'

interface IUser {
  _id: number
  email: string
  name: string
  avatar_url: string
}

const url = 'http://localhost:3000/users'

const useUsers = (cb:Function): any => {
  const [updateUsersList, setUpdateUsersList] = useState<string>('')
  const [user, setUser] = useState<IUser | {}>({})
  const [users, setUsers] = useState<Array<any>>([])
  const [createUser, setCreateUser] = useState<IUser | {}>({})
  const [fetchUser, setFetchUser] = useState<string>('')
  const [updateUserInfo, setUpdateUserInfo] = useState<IUser | {}>({})
  const [deleteUser, setDeleteUser] = useState<string>('')

  /** Hook para listar todos los usuarios */
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setUsers(response.data))
      .catch((err) => console.log('KO', err))
  }, [updateUsersList])

  /** Hook para crear usuarios */
  useEffect(() => {
    if (Boolean(Object.entries(createUser).length)) {
      axios
        .post(url, createUser)
        .then((response: any) => {
          cb(response, 'CREATE')
        })
        .catch((err: any) => {
          cb(err.response, 'CREATE')
        })
    }
  }, [createUser])

  /** Hook para traer un usuario */
  useEffect(() => {
    if (fetchUser !== '') {
      axios
        .get(`${url}/${fetchUser}`)
        .then((response: any) => {
          setUser(response.data)

          cb(response, 'FECTH')
        })
        .catch((err: any) => console.log('KO FETCH', err))
    }
  }, [fetchUser])

  /** Hook para modificar un usuario */
  useEffect(() => {
    if (Boolean(Object.entries(updateUserInfo).length)) {
      axios
        .put(`${url}`, updateUserInfo)
        .then((response: any) => {
          cb(response, 'UPDATE')
        })
        .catch((err: any) => console.log('KO UPDATE', err))
    }
  }, [updateUserInfo])

  /** Hook para borrar un usuario */
  useEffect(() => {
    if (deleteUser !== '') {
      axios
        .delete(`${url}/${deleteUser}`)
        .then((response: any) => {
          cb(response, 'DELETE')
        })
        .catch((err: any) => console.log('KO FETCH', err))
    }
  }, [deleteUser])

  return {
    user,
    users,
    setUpdateUserInfo,
    setFetchUser,
    setCreateUser,
    setDeleteUser,
    setUpdateUsersList,
  }
}

export default useUsers
