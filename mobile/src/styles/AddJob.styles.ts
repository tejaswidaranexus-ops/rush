// AddJob.styles.ts

import { StyleSheet } from "react-native";
import { typography } from "../styles/typography";

export default StyleSheet.create({
  label: {
    marginTop: 20,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },

  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    marginBottom: 10,
    fontSize: typography.sizes.md,
  },

  labelStyle: {
      marginTop: 10,
      marginBottom: 5,
  },

   openingsRow: {
    flexDirection: "row",       // ➖, number, ➕ side by side
    alignItems: "center",       // vertically center them
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#555",        // override with theme at usage
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 10,
    minHeight: 45,
  },

  openingsText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,               // or typography.sizes.md
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 10,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },

  saveButton: {
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
});