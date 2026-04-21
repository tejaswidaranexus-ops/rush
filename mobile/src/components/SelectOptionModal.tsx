import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  onSelect: (val: string) => void;
  theme: any;
};

export default function SelectOptionModal({
  visible,
  onClose,
  title,
  options,
  onSelect,
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
      {/* OUTSIDE CLICK */}
      <TouchableOpacity
        style={{ position: "absolute", width: "100%", height: "100%" }}
        onPress={onClose}
      />

      {/* MODAL */}
      <View
        style={{
          width: "85%",
          backgroundColor: theme.background,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.mode == "dark" ? theme.primary : '#000',
          padding: 20,
          maxHeight: "70%",
          minHeight: 200,
        }}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 15,
          textAlign: "center",
          color: theme.text,
        }}>
          {title}
        </Text>

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            >
            {options.map((item) => (
                <TouchableOpacity
                key={item}
                onPress={() => {
                    onSelect(item);
                    onClose();
                }}
                style={{
                    paddingVertical: 14,
                    borderBottomWidth: 0.5,
                    borderBottomColor: theme.border,
                }}
                >
                <Text style={{ color: theme.text, fontSize: 15 }}>
                    {item}
                </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}