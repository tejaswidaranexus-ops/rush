import { StyleSheet } from "react-native";
import { typography } from "../styles/typography";

export default StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 15,
  },

  title: {
    fontSize: typography.sizes.xl,
    marginTop: 10,
    fontWeight: typography.weights.bold,
  },

  subtitle: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  btn: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    minWidth: 100,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: typography.weights.bold,
  },
});