import React, { useState, useEffect } from 'react'

import { View, StyleSheet, Text } from 'react-native'

import { TextInput, Button, Snackbar } from 'react-native-paper'

import useUsers from '../../hooks/useUsers'
import useGithub from '../../hooks/useGithub'
import containerStyles from '../../styles/container'

interface Props {
  navigation?: any,
}

const Importar: React.FC<Props> = ({ navigation }) => {
  const {
    userGithub,
    setUserNameGithub,
    setUserGitHub,
  } = useGithub()

  const {
    setCreateUser
  } = useUsers((response: any, verb: string) => {
    switch(verb) {
      case 'CREATE':
        if (response.data.statusCode === 400) {
          setVisible(true)
        } else {
          navigation.setParams({
            title: 'Administrar datos',
            subtitle: 'Edita, elimina datos de usuarios'
          })
          navigation.navigate('Admin')
        }
        break
    } 
  })

  const [visible, setVisible] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')

  const fetchUserDataFromGithub = (): void => {
    setUserNameGithub(userName)
  }

  const saveUserdata = (): void => {
    setCreateUser({
      _id: userGithub.id,
      email: userGithub.email,
      name: userGithub.name,
      login: userGithub.login,
      avatar_url: userGithub.avatar_url,
    })
  }

  const onDismissSnackBar = (): void => {
    setVisible(false)
  }

  useEffect(() => {
    if (!Boolean(userName.length)) {
      setUserGitHub({})
    }
  }, [userName])

  return (
    <View style={containerStyles.container100}>
      <TextInput
        style={{
          marginTop: 30,
          width: '80%',
          marginBottom: 20,
        }}
        mode="outlined"
        label="Nombre de usuario"
        value={userName}
        onChangeText={(value) => setUserName(value)}
      />

      <Button style={styles.inputs} mode="contained" onPress={fetchUserDataFromGithub}>
        Buscar usuario
      </Button>
      <Button
        style={styles.inputs}
        disabled={!Boolean(Object.entries(userGithub).length) || !Boolean(userName.length)}
        mode="contained"
        onPress={saveUserdata}
      >
        Guardar info
      </Button>
      <Snackbar
        duration={4000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Cerrar',
          onPress: () => {},
        }}>
        <Text>Usuario ya existe en la base de datos.</Text>.
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  inputs: {
    width: '80%',
    marginTop: 10,
  },
})

export default Importar
