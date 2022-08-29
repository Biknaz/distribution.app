import React, { ReactNode } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface Props extends TextProps {
  style: any;
  children?: ReactNode;
}

export const AppText: React.FC<Props> = ({
  style = {},
  children,
  ...props
}) => (
  <Text style={{ ...styles.default, ...style }} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontWeight: "400",
    color: "#00cfe8",
  },
});
