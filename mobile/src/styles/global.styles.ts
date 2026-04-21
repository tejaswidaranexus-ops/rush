import { StyleSheet } from "react-native";

export const globalStyles = (insets: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });

export default globalStyles; 
