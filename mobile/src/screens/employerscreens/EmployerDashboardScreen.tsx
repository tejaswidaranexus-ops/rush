import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { typography } from "../../styles/typography";
import Header from "../../components/AppHeader";

export default function EmployerDashboardScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.text, fontSize: typography.sizes.lg }}>
          Employer Dashboard
        </Text>
      </View>
    </View>
  );
}