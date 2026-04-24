import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  image: string;
  onPick: () => void;
  theme: any;
};

export default function ProfileImagePicker({ image, onPick, theme }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={onPick}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: theme.primary,
            backgroundColor: theme.mode === "dark" ? "#333" : "#ddd",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome name="user" size={30} color="#fff" />
          )}
        </View>

        {/* EDIT ICON */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: theme.primary,
            borderRadius: 10,
            padding: 4,
          }}
        >
          <FontAwesome name="edit" size={12} color="#fff" />
        </View>
      </TouchableOpacity>

      <View style={{ marginLeft: 15 }}>
        <Text style={{ color: theme.text, fontWeight: "600" }}>
          Add profile picture
        </Text>
        <Text style={{ fontSize: 12, color: "#888" }}>
          Helps build trust
        </Text>
      </View>
    </View>
  );
}