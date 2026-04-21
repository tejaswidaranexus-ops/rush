import { StyleSheet } from "react-native";
import { typography } from "../styles/typography";

const styles = StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    marginVertical: 0,
  },

  profileWrapper: {
    position: "relative",
    width: 80,
    height: 80,
  },

  profileCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 40,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
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

  textColumn: {
    flex: 1,
    marginLeft: 15,
  },

  subText: {
    color: "#888",
    fontSize: typography.sizes.xs,
    marginTop: 4,
    lineHeight: 18,
    flexShrink: 1,
  },

  label: {
    marginTop: 20,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,

    paddingVertical: 16,
    paddingHorizontal: 14,

    fontSize: typography.sizes.md,
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

  selectBox: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
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

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "#222",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  sheetTitle: {
    color: "#fff",
    fontSize: typography.sizes.lg,
    marginBottom: 10,
    paddingLeft: 12,
    paddingTop: 12,
  },

  sheetText: {
    color: "#fff",
    padding: 12,
    paddingBottom: 0,
    fontSize: typography.sizes.md,
  },

  sheetSubText: {
    color: "#aaa",
    fontSize: typography.sizes.xs,
    paddingLeft: 12,
  },

  closex: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  }
});

export default styles;