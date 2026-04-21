import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import LogoR from "../components/LogoRush";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getMe } from "../services/userService";
import { useAuthStore } from "../store/authStore";

export default function SplashScreen({ navigation }: any) {
  const theme = useTheme();

  const scale = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Separate opacities for title and subtitle
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      startAnimations();
      handleNavigation();
    }, []);
  
    const startAnimations = () => {
      console.log("Splash mounted");
      // Pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.08,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Glow
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 700,
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Title
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        delay: 1200,
        useNativeDriver: true,
      }).start();

      // Subtitle
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 600,
        delay: 2200,
        useNativeDriver: true,
      }).start();
    };

    const setUser = useAuthStore.getState().setUser;

    const handleNavigation = async () => {
      console.log("Navigating...");

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.replace("PHONE");
        return;
      }

      // small delay for animation (cleaner way)
      await new Promise((res) => setTimeout(res, 2000));

      //setTimeout(async () => {
        // ❌ No token → go login
        //if (!token) {
          //navigation.replace("PHONE");
          //return;
        //}

        try {
          const res = await getMe();

          console.log("User data:", res);

          setUser(res.user);

          if (!res.user.role) {
            navigation.replace("ROLE");
          } 
          else if (res.user.role === "jobseeker") {

            if (!res.hasJobseekerProfile) {
              navigation.replace("JOB_SEEKER_PROFILE");
            } 
            else if (!res.hasPreferences) {
              navigation.replace("JOB_PREFERENCE");
            } 
            else {
              navigation.replace("JOBSEEKER_DASHBOARD");
            }

          } 
          else if (res.user.role === "employer") {

            if (!res.hasEmployerProfile) {
              navigation.replace("EMPLOYER_PROFILE");
            } else {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "MAIN_TABS",
                    params: { screen: "DASHBOARD" },
                  },
                ],
              });
            }

          }

        } catch (error) {
          console.log("Error fetching user:", error);

          await AsyncStorage.removeItem("token");
          navigation.replace("PHONE");
        }
        
    };

  // 🔶 Glow interpolation
  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 25],
  });

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <LinearGradient
      colors={["#0f0f1a", "#1a0f0f", "#001a1a"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 🔶 OUTER GLOW LAYER (JS driver) */}
      <Animated.View
        style={{
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: shadowRadius,
          shadowOpacity: shadowOpacity,
          borderRadius: 100,
          elevation: Platform.OS === "android" ? 25 : 0,
        }}
      >
        {/* 🔶 INNER CIRCLE (native driver scale) */}
        <Animated.View
          style={{
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: theme.primary,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ scale }],
          }}
        >
          <LogoR size={120} />
        </Animated.View>
      </Animated.View>

      {/* 🔶 Staggered Text */}
      <View style={{ marginTop: 30, alignItems: "center" }}>
        {/* Title */}
        <Animated.Text
          style={{
            fontSize: 34,
            fontWeight: typography.weights.bold,
            opacity: titleOpacity,
          }}
        >
          <Text style={{ color: theme.primary }}>RUSH</Text>
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text
          style={{
            color: "#aaa",
            marginTop: 8,
            opacity: subtitleOpacity,
          }}
        >
          Rush for real work
        </Animated.Text>
      </View>
    </LinearGradient>
  );
}