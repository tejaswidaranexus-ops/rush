import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import styles from "../styles/EmployerConfirmModal.styles";

export default function DeleteConfirmModal({
  visible,
  onClose,
  onDelete,
  jobTitle,
}: any) {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={[styles.modal, { backgroundColor: theme.background }]}>
        
        {/* Close */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={{ color: theme.text, fontSize: typography.sizes.lg }}>✕</Text>
        </TouchableOpacity>

        {/* Icon */}
        <FontAwesome name="trash" size={40} color="#ff4d4f" />

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>
          Delete Job?
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Are you sure you want to delete{"\n"}
          <Text style={{ fontWeight: "600", color: theme.text }}>
            "{jobTitle}"
          </Text>
          {"\n"}This action cannot be undone.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#555" }]}
            onPress={onClose}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#ff4d4f" }]}
            onPress={onDelete}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}