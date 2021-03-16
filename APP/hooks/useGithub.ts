import { useState, useEffect } from 'react'

import axios from 'axios'

interface IUser {
  _id: number
  email: string
  name: string
  avatar_url: string
}

const url = 'https://api.github.com'

const useGithub = (): any => {
  const [userGithub, setUserGitHub] = useState<any>({})
  const [userNameGithub, setUserNameGithub] = useState<string>('')
  const [userGitHubGraph, setUserGitHubGraph] = useState<Array<any>>([])

  /** Hook para traer la información del usuario */
  useEffect(() => {
    if (userNameGithub !== '') {
      axios
        .get(`${url}/users/${userNameGithub}`)
        .then((response) => {
          console.log('OK USER', response)
          setUserGitHub(response.data)
        })
        .catch((err) => console.log('KO', err))

      axios
        .get(`${url}/users/${userNameGithub}/repos`)
        .then((response) => console.log('OK REPOS', response))
        .catch((err) => console.log('KO', err))
    }
  }, [userNameGithub])

  /** Hooks para traer datos de los repositorios */
  useEffect(() => {
    if (userNameGithub !== '') {
      axios
        .get(`${url}/users/${userNameGithub}/repos`)
        .then((response) => setUserGitHubGraph(response.data))
        .catch((err) => console.log('KO', err))
    }
  }, [userNameGithub])

  return {
    userGithub,
    userGitHubGraph,
    setUserGitHub,
    setUserNameGithub,
  }
}

export default useGithub
