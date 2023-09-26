import { Alert, TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

type Props = TouchableOpacityProps & {
  title: string;
}

export function GroupCard({ title, ...rest }: Props) {

  async function handleDeleteGroup() {
    //await AsyncStorage.removeItem(GROUP_COLLECTION)
    Alert.alert('Removing groups')
  }

  return (
    <Container
      //onLongPress={handleDeleteGroup}
      activeOpacity={0.6}
      {...rest}
    >
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}