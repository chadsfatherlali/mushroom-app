import React, { useEffect, useState } from 'react'

import { StyleSheet, View, Text } from 'react-native'

import { Card, Button, TextInput, List, Divider, Snackbar, Dialog } from 'react-native-paper'

import RadarChart from 'react-svg-radar-chart'

import 'react-svg-radar-chart/build/css/index.css'

interface Props {
  navigation?: any
  previous?: any
  route?: any
}

import useUsers from '../../hooks/useUsers'
import useGithub from '../../hooks/useGithub'
import { DefaultTheme } from '@react-navigation/native'

const AccountDetails: React.FC<Props> = ({ navigation, previous, route }) => {
  const {
    user,
    setFetchUser,
    setUpdateUserInfo,
    setDeleteUser,
  } = useUsers((response: any, verb: string) => {
    switch (verb) {
      case 'UPDATE':
        setVisible(true)
        break;
      case 'DELETE':
        setVisibleDialog(false)

        navigation.navigate('Home')
        break
    }
  })

  const { setUserNameGithub, userGitHubGraph } = useGithub()

  const [visible, setVisible] = useState<boolean>(false)
  const [userFormValues, setUserFormValues] = useState<any>({})
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false)

  const hideDialog = (): void => {
    setVisibleDialog(false)
  }

  const onDismissSnackBar = (): void => {
    setVisible(false)
  }

  useEffect(() => {
    if (route.params._id !== '') {
      setFetchUser(route.params._id)
    }
  }, [route.params._id])

  useEffect(() => {
    if (Boolean(Object.entries(user).length)) {
      setUserFormValues(user)
      setUserNameGithub(user.login)
    }
  }, [user])

  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: userFormValues.avatar_url }} />
        <Card.Content>
          <TextInput
            style={{
              marginTop: 10,
              width: '100%',
              marginBottom: 20,
            }}
            mode="outlined"
            label="Nombre"
            value={userFormValues.name}
            onChangeText={(value) =>
              setUserFormValues({ ...userFormValues, name: value })
            }
          />
          <TextInput
            style={{
              marginTop: 10,
              width: '100%',
              marginBottom: 20,
            }}
            mode="outlined"
            label="Nombre de usuario"
            value={userFormValues.login}
            onChangeText={(value) =>
              setUserFormValues({ ...userFormValues, login: value })
            }
          />
          <TextInput
            style={{
              marginTop: 10,
              width: '100%',
              marginBottom: 20,
            }}
            mode="outlined"
            label="Email"
            value={userFormValues.email}
            onChangeText={(value) =>
              setUserFormValues({ ...userFormValues, email: value })
            }
          />
          {Boolean(userGitHubGraph.length) && <View style={styles.viewScroll}>
            <List.Section>
              {userGitHubGraph.map((repository: any, index: number) => (
                <View>
                  <List.Accordion key={index} title={repository.name}>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RadarChart
                        captions={{
                          forks: 'Forks',
                          watchers: 'Watchers',
                          stargazers_count: 'Seguidores',
                        }}
                        data={[
                          {
                            data: {
                              forks: Boolean(repository.forks)
                                ? repository.forks / 10
                                : 0.1,
                              watchers: Boolean(repository.watchers)
                                ? repository.watchers / 10
                                : 0.1,
                              stargazers_count: Boolean(repository.stargazers_count)
                                ? repository.stargazers_count / 10
                                : 0.1,
                            },
                            meta: { color: DefaultTheme.colors.primary },
                          },
                        ]}
                        size={150}
                      />
                    </View>
                  </List.Accordion>
                  <Divider/>
                </View>
              ))}
            </List.Section>
          </View>}
        </Card.Content>
        <Card.Actions>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={navigation.goBack}
          >
            Cancelar
          </Button>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => setVisibleDialog(true)}
          >
            Borrar
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => setUpdateUserInfo(userFormValues)}
          >
            Guardar
          </Button>
        </Card.Actions>
      </Card>
      <Snackbar
        duration={4000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ceraar',
          onPress: () => { null },
        }}>
        <Text>Se ha modificado correctament la información</Text>
      </Snackbar>
      <Dialog visible={visibleDialog} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text>Esta seguro que desea borrar la cuenta</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisibleDialog(false)}>Cancelar</Button>
          <Button onPress={() => setDeleteUser(userFormValues._id)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '32.33333%',
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  viewScroll: {
    height: 195,
    overflow: 'scroll',
  },
})

export default AccountDetails
