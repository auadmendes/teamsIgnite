import { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Container
} from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { Alert, FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { groupsGetAll } from "@storage/group/groupGetAll";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Groups() {
  const navigation = useNavigation()
  const [groups, setGroups] = useState<string[]>([])

  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group: group })
  }

  async function fetchGroups() {
    try {
      //await AsyncStorage.removeItem('@ignite-teams:groups')
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(useCallback(() => {
    fetchGroups()
  }, []));


  return (
    <Container>
      <Header />

      <Highlight
        title="Teams"
        subtitle="Play with your team"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Lets create your first team?" />
        )}
      />
      <Button
        title={groups.length === 0 ? "Create your first team" : "Create a new team"}
        onPress={handleNewGroup}

      />
    </Container>
  )
}