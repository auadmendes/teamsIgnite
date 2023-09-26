import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard } from "react-native";
import { Highlight } from "@components/Highlight";
import {
  Container,
  Content,
  Icon
} from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState('')

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("New team", "Please, inform the team's name")
      }
      await groupCreate(group);

      Keyboard.dismiss();

      navigation.navigate('players', { group: group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Team!', error.message)
      } else {
        Alert.alert('Error', 'Sorry, We could not create a group. check your spelling and try again. If it not works contact the creator')
      }
      console.log(error)
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />

        <Highlight
          title="New team"
          subtitle="Create a team to add people"
        />

        <Input
          onChangeText={(text) => setGroup(text)}
          value={group}
        />

        <Button
          title="Create"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}