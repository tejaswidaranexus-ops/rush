import { StyleSheet } from "react-native";
import { typography } from "./typography";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    scrollContent: {
      padding: 20,
      paddingBottom: 160,
    },

    header: {
      marginBottom: 20,
    },

    title: {
      color: theme.text,
      fontSize: typography.sizes.xxxl,
      fontWeight: typography.weights.bold,
    },

    location: {
      color: theme.placeholder,
      marginTop: 5,
    },

    salary: {
      color: theme.primary,
      marginTop: 10,
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
    },

    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 15,
    },

    card: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
    },

    cardTitle: {
      color: theme.text,
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      marginBottom: 10,
    },

    itemText: {
      color: theme.text,
      marginBottom: 6,
    },

    itemValue: {
      color: theme.placeholder,
    },

    chip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      marginRight: 8,
      marginBottom: 8,
    },

    chipSmall: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },

    chipText: {
      fontSize: 14,
    },

    chipTextSmall: {
      fontSize: 12,
    },

    descriptionText: {
      lineHeight: 22,
    },

    ctaContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: theme.background,
        padding: 15,
        borderTopWidth: 1,
        borderColor: theme.border,


        elevation: 10, // Android shadow
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -2 }, // iOS shadow direction (upwards)
    },

    primaryBtn: {
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
    },

    dangerBtn: {
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: "#e53935",
    },

    btnText: {
      color: "#fff",
      fontWeight: "700",
    },

    row: {
      flexDirection: "row",
    },
  });