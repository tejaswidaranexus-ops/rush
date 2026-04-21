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
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: typography.sizes.lg,
  },
  saveButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
});
