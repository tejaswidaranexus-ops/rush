import { StyleSheet } from "react-native";
import { typography } from "../styles/typography";

export default StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },

  profileWrapper: {
    position: "relative",
    width: 80,
    height: 80,
  },

  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,

    transform: [{ translateX: 6 }, { translateY: 6 }], // slight push outside

    width: 26,
    height: 26,
    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
    elevation: 5,
  },

  subText: {
    color: "#888",
    fontSize: typography.sizes.xs,
  },

  label: {
    marginTop: 20,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,

    // 🔥 increased size
    paddingVertical: 16,
    paddingHorizontal: 14,

    // 🔥 better text readability
    fontSize: 16,
    lineHeight: 20,

    marginTop: 6,
  },

  genderRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  genderButton: {
    marginRight: 15,
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
  },

  note: {
    color: "red",
    fontSize: typography.sizes.xs,
    marginTop: 20,
    paddingLeft: 3,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  checked: {
    width: 10,
    height: 10,
    backgroundColor: "#FF0125",
  },

  saveButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: typography.weights.bold,
  },
});