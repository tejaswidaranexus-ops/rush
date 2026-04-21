import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import styles from "../styles/EmployerConfirmModal.styles";

export default function EmployerConfirmModal({
  visible,
  onClose,
  onProceed,
  navigation,
}: any) {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={[styles.modal, { backgroundColor: theme.background }]}>
        
        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={{ color: theme.text, fontSize: typography.sizes.lg}}>✕</Text>
        </TouchableOpacity>

        {/* Warning Icon */}
        <FontAwesome name="warning" size={40} color={theme.primary} />

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>
          Are you sure?
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Confirm that you are an employer, and NOT a job seeker.
          {"\n"}You'll be verified by us.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#555" }]}
            onPress={onClose} 
          >
            <Text style={styles.btnText}>Exit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.primary }]}
            onPress={onProceed}
          >
            <Text style={styles.btnText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}