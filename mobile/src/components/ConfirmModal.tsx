import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  theme: any;
};

export default function ConfirmModal({
  visible,
  message,
  onConfirm,
  onCancel,
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
        onPress={onCancel}
      />

      {/* BOX */}
      <View
        style={{
          width: "80%",
          backgroundColor: theme.background,
          borderRadius: 16,
          padding: 20,
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

        {/* BUTTONS */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          
          {/* CANCEL */}
          <TouchableOpacity
            onPress={onCancel}
            style={{
              flex: 1,
              marginRight: 10,
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: "#555",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Stay</Text>
          </TouchableOpacity>

          {/* CONFIRM */}
          <TouchableOpacity
            onPress={onConfirm}
            style={{
              flex: 1,
              marginLeft: 10,
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: "red",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Discard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}