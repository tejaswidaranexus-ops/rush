import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (source: "camera" | "gallery" | "files") => void;

  theme: any;

  title?: string;
  allowFiles?: boolean;
  allowRemove?: boolean;
  onRemove?: () => void;
};

export default function UploadModal({
  visible,
  onClose,
  onSelect,
  theme,
  title = "Upload",
  allowFiles = false,
  allowRemove = false,
  onRemove,
}: Props) {
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
      onTouchStart={onClose}
    >
      <View
        style={{
          width: "85%",
          backgroundColor: theme.background,
          borderRadius: 16,
          padding: 20,
        }}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* TITLE */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 20,
            textAlign: "center",
            color: theme.text,
          }}
        >
          {title}
        </Text>

        {/* OPTIONS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {/* CAMERA */}
          <TouchableOpacity
            onPress={async () => {
                await onSelect("camera");
                onClose(); // ✅ close modal after selection
            }}
            style={{ alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: theme.primary + "20",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <FontAwesome
                name="camera"
                size={22}
                color={theme.mode === "dark" ? theme.primary : "#000"}
              />
            </View>
            <Text style={{ marginTop: 8, color: theme.text }}>Camera</Text>
          </TouchableOpacity>

          {/* GALLERY */}
          <TouchableOpacity
            onPress={async () => {
            await onSelect("gallery");
            onClose();
            }}
            style={{ alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: theme.primary + "20",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <FontAwesome
                name="image"
                size={22}
                color={theme.mode === "dark" ? theme.primary : "#000"}
              />
            </View>
            <Text style={{ marginTop: 8, color: theme.text }}>Gallery</Text>
          </TouchableOpacity>

          {/* FILES */}
          {allowFiles && (
            <TouchableOpacity
              onPress={async () => {
                await onSelect("files");
                onClose();
                }}
              style={{ alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: theme.primary + "20",
                  padding: 15,
                  borderRadius: 50,
                }}
              >
                <FontAwesome
                  name="folder"
                  size={22}
                  color={theme.mode === "dark" ? theme.primary : "#000"}
                />
              </View>
              <Text style={{ marginTop: 8, color: theme.text }}>Files</Text>
            </TouchableOpacity>
          )}

          {/* REMOVE */}
          {allowRemove && (
            <TouchableOpacity
              onPress={() => {
                onRemove?.();
                onClose(); // ✅ close after remove
                }}
              style={{ alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#ff4d4d20",
                  padding: 15,
                  borderRadius: 50,
                }}
              >
                <FontAwesome name="trash" size={22} color="red" />
              </View>
              <Text style={{ marginTop: 8, color: "red" }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* CANCEL */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            marginTop: 20,
            paddingVertical: 12,
            backgroundColor: "red",
            borderRadius: 8,
            alignItems: "center",
            alignSelf: "center",
            width: "50%",
          }}
        >
          <Text style={{ color: "#000", fontWeight: "600" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}