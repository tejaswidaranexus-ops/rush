import { View, Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import EmployerConfirmModal from "../components/EmployerConfirmModel";
import { useThemeStore } from "../store/themeStore";

import { selectRole } from "../services/userService";
import { useAuthStore } from "../store/authStore";

export default function RoleSelectionScreen({ navigation }: any) {
  const theme = useTheme();
  const setUser = useAuthStore((s) => s.setUser);

  const [showEmployerModal, setShowEmployerModal] = useState(false);

  const setTheme = useThemeStore((s) => s.setTheme);
  const currentTheme = useThemeStore((s) => s.theme);

  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  // Animated value for sliding indicator
  const slideAnim = useRef(new Animated.Value(currentTheme === "dark" ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: selectedTheme === "dark" ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [selectedTheme]);

  const handleThemeSelect = (value: "light" | "dark") => {
    setTheme(value);
    setSelectedTheme(value);
  };

  // Interpolate sliding position
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // half of container width
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 20,
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <Text
        style={{
          color: theme.text,
          fontSize: typography.sizes.xxxl,
          fontWeight: typography.weights.bold,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        You are a...
      </Text>

      <Text
        style={{
          color: "#888",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        Choose who you are & what you are looking for
      </Text>

      {/* Job Seeker */}
      <TouchableOpacity
        onPress={async () => {
          try {
            const res = await selectRole("jobseeker");

            console.log("Role response:", res);

            setUser(res.user);

            navigation.replace("JOB_SEEKER_PROFILE");
          } catch (error) {
            console.log("Role error:", error);
          }
        }}
        style={{
          backgroundColor: theme.card,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 2,
          borderColor: theme.primary,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >

          <FontAwesome
            name="user"
            size={24}
            color={
              selectedTheme === "light"
                ? "#fff"   // white when light is selected
                : selectedTheme === "dark"
                ? "#000"   // black when dark is selected
                : theme.text
            }
          />
        </View>
        <Text style={{ color: theme.text, fontSize: typography.sizes.lg }}>Job Seeker</Text>
      </TouchableOpacity>

      {/* Employer */}
      <TouchableOpacity
        onPress={() => setShowEmployerModal(true)}
        style={{
          backgroundColor: theme.card,
          padding: 20,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 2,
          borderColor: theme.primary,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <FontAwesome
            name="building"
            size={24}
            color={
              selectedTheme === "light"
                ? "#fff"   // white when light is selected
                : selectedTheme === "dark"
                ? "#000"   // black when dark is selected
                : theme.text
            }
          />

        </View>
        <Text style={{ color: theme.text, fontSize: typography.sizes.lg }}>Employer</Text>
      </TouchableOpacity>

      {/* Theme Selection */}
      <Text
        style={{
          color: theme.text,
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.semibold,
          marginTop: 40,
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        Select Theme
      </Text>

      {/* Oval Toggle */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: "rgba(0, 0, 0, 0.1)", // semi-transparent background
            borderRadius: 25,
            flexDirection: "row",
            overflow: "hidden",
            position: "relative",
            borderWidth: 2, 
            borderColor: theme.primary, 
          }}
        >
          {/* Sliding Highlight */}
          <Animated.View
            style={{
              position: "absolute",
              top: -2,
              left: 0,
              width: 150,
              height: 50,
              backgroundColor: theme.primary,
              borderRadius: 25,
              transform: [{ translateX }],
            }}
          />

          {/* Light Button */}
          <TouchableOpacity
            onPress={() => handleThemeSelect("light")}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FontAwesome
              name="sun-o"
              size={20}
              color={
                selectedTheme === "light"
                  ? "#fff"
                  : selectedTheme === "dark"
                  ? "#fff" // black when dark is selected
                  : theme.text
              }
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color:
                  selectedTheme === "light"
                    ? "#fff"
                    : selectedTheme === "dark"
                    ? "#fff" // black when dark is selected
                    : theme.text,
                fontWeight: typography.weights.bold,
              }}
            >
              Light
            </Text>
          </TouchableOpacity>

          {/* Dark Button */}
          <TouchableOpacity
            onPress={() => handleThemeSelect("dark")}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FontAwesome
              name="moon-o"
              size={20}
              color={selectedTheme === "dark" ? "#fff" : theme.text}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: selectedTheme === "dark" ? "#fff" : theme.text,
                fontWeight: typography.weights.bold,
              }}
            >
              Dark
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Employer Confirmation Modal */}
      <EmployerConfirmModal
        visible={showEmployerModal}
        onClose={() => setShowEmployerModal(false)}
        onProceed={async () => {
          try {
            setShowEmployerModal(false);

            const res = await selectRole("employer");

            console.log("Role response:", res);

            setUser(res.user);

            navigation.replace("EMPLOYER_PROFILE");
          } catch (error) {
            console.log("Role error:", error);
          }
        }}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
