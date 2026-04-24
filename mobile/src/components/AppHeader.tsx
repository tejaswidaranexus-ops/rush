import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import { useThemeStore } from "../store/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEmployerStore } from "../store/employerStore";

export default function AppHeader({ role = "employer" }: { role?: "employer" | "jobseeker" }) {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const currentTheme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const { name } = useEmployerStore();

  const handleProfilePress = () => {
    if (role === "employer") {
      if (!name) {
        navigation.navigate("EMPLOYER_PROFILE_CREATE");
      } else {
        navigation.navigate("EMPLOYER_PROFILE_VIEW");
      }
    } else {
      navigation.navigate("JOB_SEEKER_PROFILE");
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: theme.background }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          paddingTop: Platform.OS === "android"
            ? StatusBar.currentHeight ?? 0
            : 0,
        }}
      >
        {/* LOGO */}
        <Text
          style={{
            color: theme.primary,
            fontSize: typography.sizes.xxl,
            fontWeight: typography.weights.bold,
            letterSpacing: 1,
          }}
        >
          RUSH
        </Text>

        {/* ACTIONS */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          
          {/* THEME */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              marginRight: 15,
              padding: 8,
              borderRadius: 20,
              backgroundColor: theme.primary,
            }}
          >
            <Text style={{ color: "#fff", fontSize: typography.sizes.xs }}>
              {currentTheme === "dark" ? "🌙" : "☀️"}
            </Text>
          </TouchableOpacity>

          {/* PROFILE */}
          <TouchableOpacity onPress={handleProfilePress}>
            <Ionicons
              name="person-circle-outline"
              size={30}
              color={theme.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}