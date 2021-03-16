import React, { useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { DefaultTheme, IconButton, Card } from 'react-native-paper'

import containerStyles from '../../styles/container'

interface Props {
  navigation: any
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [hover, setHover] = useState<any>({
    git: false,
    admin: false,
  })

  return (
    <View style={containerStyles.container}>
      <Card
        elevation={3}
        onTouchStart={() => {
          setHover({ ...hover, git: true })
          
          navigation.setParams({
            title: 'Importar datos de GitHub',
            subtitle: 'Introduce tu nombre de usuario'
          })
          navigation.navigate('Import')
        }}
        onTouchEnd={() => setHover({ ...hover, git: false })}
        style={hover.git ? styles.cardHover : styles.card}
      >
        <Card.Content>
          <IconButton
            icon="github"
            color={hover.git ? 'white' : DefaultTheme.colors.primary}
            size={80}
          />
          <Text style={hover.git ? styles.textHover : styles.text}>
            Importar
          </Text>
        </Card.Content>
      </Card>
      <Card
        elevation={3}
        onTouchStart={() => {
          setHover({ ...hover, admin: true })
          
          navigation.setParams({
            title: 'Administrar datos',
            subtitle: 'Edita, elimina datos de usuarios'
          })
          navigation.navigate('Admin')
        }}
        onTouchEnd={() => setHover({ ...hover, admin: false })}
        style={hover.admin ? styles.cardHover : styles.card}
      >
        <Card.Content>
          <IconButton
            icon="account-group-outline"
            color={hover.admin ? 'white' : DefaultTheme.colors.primary}
            size={80}
          />
          <Text style={hover.admin ? styles.textHover : styles.text}>
            Administrar
          </Text>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginTop: 35,
    textAlign: 'center',
  },
  cardHover: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginTop: 35,
    backgroundColor: DefaultTheme.colors.primary,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: DefaultTheme.colors.primary,
  },
  textHover: {
    textAlign: 'center',
    color: 'white',
  },
})

export default Home
