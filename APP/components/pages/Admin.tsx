import React, { useEffect, useState } from 'react'

import { View } from 'react-native'

import { List, Avatar, Divider, Searchbar } from 'react-native-paper'

import axios from 'axios'

import useUsers from '../../hooks/useUsers'
import containerStyles from '../../styles/container'

interface Props {
  navigation?: any
}

const Admin: React.FC<Props> = ({ navigation }) => {
  const { users } = useUsers(() => null)

  const [usersData, setUsersData] = useState<Array<any>>([]) 
  const [searchQuery, setSearchQuery] = useState<string>('')

  const onChangeSearch = (value: string): void => {
    setSearchQuery(value)
  }

  useEffect(() => {
    setUsersData(users)
  }, [users])

  useEffect(() => {
    if (searchQuery === '') {
      setUsersData(users)
    } else {
      axios
        .get(`http://localhost:3000/search?q=${searchQuery}`)
        .then((response: any) => {
          setUsersData(response.data)
        })
        .catch((err: any) => console.log(err))
    }
  }, [searchQuery])

  return (
    <View style={containerStyles.containerStart}>
      <Searchbar
        style={{
          width: '100%'
        }}
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {usersData.map((user: any, index: number) => (
        <View
          key={index}
          style={{
            width: '100%',
          }}
        >
          <List.Item
            title={user.name}
            description={user.login}
            left={() => <Avatar.Image source={user.avatar_url} />}
            onPress={() => {
              navigation.setParams({
                title: user.name,
                subtitle: user.login,
              })
              navigation.navigate('AccountDetails', {
                _id: user._id,
              })
            }}
          />
          <Divider />
        </View>
      ))}
    </View>
  )
}

export default Admin
