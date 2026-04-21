import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
  theme: any;
};

export default function AlertModal({
  visible,
  message,
  onClose,
  theme,
}: Props) {
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* BACKDROP */}
      <TouchableOpacity
        style={{ position: "absolute", width: "100%", height: "100%" }}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* BOX */}
      <View
        style={{
          width: "80%",
          backgroundColor: theme.background,
          borderRadius: 16,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: theme.text,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {message}
        </Text>

        <TouchableOpacity
          onPress={onClose}
          style={{
            backgroundColor: theme.primary,
            paddingVertical: 10,
            paddingHorizontal: 25,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}