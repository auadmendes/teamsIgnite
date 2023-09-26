import {
  useEffect,
  useState,
  useRef
} from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Alert,
  FlatList,
  TextInput
} from "react-native";

import {
  Container,
  Form,
  HeaderList,
  NumberOfPlayers
} from "./styles";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemove } from "@storage/group/groupRemove";
import { Loading } from "@components/Loading";



type RouteParams = {
  group: string;
}


export function Players() {
  const [isLoading, setIsLoading] = useState(true);

  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();

  const [newPlayerName, setNewPlayerName] = useState('');

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New Player!', 'Inform the name of the player to add.')
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {

      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur(); // remove the focus from the Input
      setNewPlayerName('');
      fetchPlayersByTeam();


    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Player!', error.message)
      } else {
        console.log(error)
      }
    }

  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert(error.message)
      } else {
        console.log(error)
      }
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Delete Player', 'Sorry, unable to delete the player.')
    }

  }
  async function removeGroup() {
    try {
      await groupRemove(group);
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Error while removing team.')
    }
  }
  async function handleDeleteGroup() {
    Alert.alert(
      'Remove Group',
      `Would you like to remove ${group}?`,
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: removeGroup }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header
        showBackButton
      />

      <Highlight
        title={group}
        subtitle="Add teammates"
      />

      <Form>
        <Input
          placeholder="Person name"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer} // to use the keyboard to start a function
          returnKeyType="done" // The name that will appear on the keyboard
        />

        <ButtonIcon
          onPress={handleAddPlayer}
          icon="add"
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Team A', 'Team B', 'Team C']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {!isLoading ?
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
          ListEmptyComponent={() => (
            <ListEmpty
              message="No team members to display"
            />
          )}
        /> :
        <Loading />
      }
      <Button
        onPress={handleDeleteGroup}
        title="Remove team"
        type="SECONDARY"
      />

    </Container>
  )
}