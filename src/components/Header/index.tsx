import { useNavigation } from '@react-navigation/native';
import {
  BackIcon,
  Container,
  Logo,
  BackButton,
  LogoButton
} from './styles';

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation()

  function handleBackButton() {
    navigation.goBack()
  }

  function handleLogoButtonGoHome() {
    navigation.navigate('groups')
  }
  return (
    <Container>
      {showBackButton &&
        <BackButton
          onPress={handleBackButton}
        >
          <BackIcon />
        </BackButton>
      }
      <LogoButton
        onPress={handleLogoButtonGoHome}
      >
        <Logo source={logoImg} />
      </LogoButton>
    </Container>
  )
}