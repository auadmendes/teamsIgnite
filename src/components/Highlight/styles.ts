import styled,  { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 32px 0;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.xl}px;
    font-family: ${theme.font_family.bold};
    color: ${theme.colors.white}
  `}
  text-align: center;
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    font-family: ${theme.font_family.regular};
    color: ${theme.colors.gray_300}
  `}

  text-align: center;
`;