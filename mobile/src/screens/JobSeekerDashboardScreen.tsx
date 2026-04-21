import { View, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import AppHeader from "../components/AppHeader";

export default function JobSeekerDashboardScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AppHeader role="jobseeker" />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.text, fontSize: typography.sizes.lg }}>
          Job Seeker Dashboard
        </Text>
      </View>
    </View>
  );
}