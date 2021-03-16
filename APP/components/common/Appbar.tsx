import React from 'react'

import { Appbar } from 'react-native-paper'

interface Props {
  navigation?: any
  previous?: any
  route?: any
}

const AppbarCustom: React.FC<Props> = ({ navigation, previous, route }) => {
  return (
    <>
      <Appbar.Header>
        {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content
          title={previous?.route?.params?.title || 'Bienvenido'}
          subtitle={previous?.route?.params?.subtitle || 'Elige una opción'}
        />
      </Appbar.Header>
    </>
  )
}

export default AppbarCustom
