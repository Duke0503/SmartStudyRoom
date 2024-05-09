import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TextProps } from "./types";

const StyledText = styled.Text`
  font-size: 17px;
  font-weight: 700;
  text-align: left;
`;

/* Receive 2 arguments and pass it into the function */
const LSemiBold: FunctionComponent<TextProps> = (props) => {
  return (
    <StyledText style={props.textStyles as any}>{props.children}</StyledText>
  );
};
export default LSemiBold;