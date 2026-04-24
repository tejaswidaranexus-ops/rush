import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../hooks/useTheme";
import { useThemeStore } from "../store/themeStore";

import SplashScreen from "../screens/SplashScreen";

import TermsScreen from "../screens/TermsScreen";
import PhoneScreen from "../screens/PhoneScreen";
import OtpScreen from "../screens/OtpScreen";

import RoleSelectionScreen from "../screens/RoleSelectionScreen";

import JobSeekerProfileScreen from "../screens/jobseekerscreens/JobSeekerProfileScreen";
import JobSeekerDashboardScreen from "../screens/jobseekerscreens/JobSeekerDashboardScreen";
import AddCollegeDetailsScreen from "../screens/jobseekerscreens/AddCollegeDetailsScreen";
import JobPreferenceScreen from "../screens/jobseekerscreens/JobPreferenceScreen";
import CitySelectionScreen from "../screens/CitySelectionScreen";
import PositionSelectionScreen from "../screens/PositionSelectionScreen";
import JobSeekerVerificationScreen from "../screens/JobSeekerVerificationScreen";

import EmployerTabNavigator from "../components/EmployerTabNavigator";


import EmployerProfileEditScreen from "../screens/employerscreens/EmployerProfileEditScreen";
import EmployerDashboardScreen from "../screens/employerscreens/EmployerDashboardScreen";
import EmployerJobsScreen from "../screens/jobscreens/EmployerJobsScreen";
import AddJobScreen from "../screens/jobscreens/AddJobScreen";

import JobDetailsScreen from "../screens/jobscreens/JobDetailsScreen";

// const Stack = createNativeStackNavigator();

// Define all route params here
export type RootStackParamList = {
  SPLASH: undefined;

  TERMS: undefined;
  PHONE: undefined;
  OTP: { phone: string };

  ROLE: undefined;


  JOB_SEEKER_PROFILE: undefined;
  JOBSEEKER_DASHBOARD: undefined;
  ADD_COLLEGE: { education: string };
  JOB_PREFERENCE: { fromEducation?: boolean; fromProfile?: boolean };
  JOBSEEKER_VERIFICATION: undefined;
  CITY_SELECTION: undefined;
  POSITION_SELECTION: undefined;

  MAIN_TABS: { screen?: string };

 // EMPLOYER_PROFILE: { from?: "dashboard" | "role" };
  EMPLOYER_PROFILE_CREATE: undefined;
  EMPLOYER_PROFILE_EDIT: undefined;
  EMPLOYER_PROFILE_VIEW: undefined;
  EMPLOYER_DASHBOARD: undefined;
  JOBS_LIST: undefined;
  ADD_JOB: undefined;

  JOB_DETAILS: { job: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AppNavigator() {
  const theme = useTheme();
  const currentTheme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const navTheme: Theme = {
    ...(currentTheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(currentTheme === "dark"
        ? DarkTheme.colors
        : DefaultTheme.colors),
      background: theme.background,
      card: theme.background,
      text: theme.text,
      primary: theme.primary,
      border: "#ccc",
      notification: theme.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="SPLASH"   // ✅ IMPORTANT
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            color: theme.text,
          },
          headerTitle: "",
          headerShadowVisible: false,
        }}
      >
        {/* ✅ FIRST SCREEN */}
        <Stack.Screen
          name="SPLASH"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TERMS"
          component={TermsScreen}
          options={{ headerTitle: "Terms & Conditions" }}
        />

        <Stack.Screen
          name="PHONE"
          component={PhoneScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OTP"
          component={OtpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ROLE"
          component={RoleSelectionScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="JOB_SEEKER_PROFILE" 
          component={JobSeekerProfileScreen}
          options={({ navigation }) => ({
            headerTitle: "Create Profile",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ROLE")}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="EMPLOYER_PROFILE_CREATE"
          component={require("../screens/employerscreens/EmployerProfileCreateScreen").default}
          options={({ navigation }) => ({
            headerTitle: "Create Profile",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ROLE")}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="EMPLOYER_PROFILE_EDIT"
          component={require("../screens/employerscreens/EmployerProfileEditScreen").default}
          options={({ navigation }) => ({
            headerTitle: "Edit Profile",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("EMPLOYER_PROFILE_VIEW")}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="EMPLOYER_PROFILE_VIEW"
          component={require("../screens/employerscreens/EmployerProfileViewScreen").default}
          options={({ navigation }) => ({
            headerTitle: "Profile",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("MAIN_TABS", { screen: "DASHBOARD" })}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen
          name="ADD_COLLEGE"
          component={AddCollegeDetailsScreen}
          options={({ navigation }) => ({
            headerTitle: "Education Details",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("JOB_SEEKER_PROFILE")}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />


       <Stack.Screen
          name="JOB_PREFERENCE"
          component={JobPreferenceScreen}
          options={({ navigation, route }) => {
            const fromEducation = route.params?.fromEducation;
            const fromProfile = route.params?.fromProfile;

            return {
              headerTitle: "Job Preferences",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (fromEducation) {
                      navigation.navigate("ADD_COLLEGE", { education: "Bachelor's" }); 
                    } else {
                      navigation.navigate("JOB_SEEKER_PROFILE");
                    }
                  }}
                  style={{ margin: 10 }}
                >
                  <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
              ),
            };
          }}
        />


        <Stack.Screen
          name="JOBSEEKER_VERIFICATION"
          component={JobSeekerVerificationScreen}
          options={({ navigation }) => ({
            headerTitle: "Verification",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("JOB_PREFERENCE", { fromProfile: true })}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen
          name="CITY_SELECTION"
          component={CitySelectionScreen}
          options={({ navigation }) => ({
            headerTitle: "Select Cities",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("JOB_PREFERENCE", { fromProfile: true })}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="POSITION_SELECTION"
          component={PositionSelectionScreen}
          options={({ navigation }) => ({
            headerTitle: "Select Job Role",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("JOB_PREFERENCE", { fromProfile: true })}
                style={{ margin: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={theme.text} />
              </TouchableOpacity>
            ),
          })}
        />



        <Stack.Screen
          name="ADD_JOB"
          component={AddJobScreen}
          options={{ headerTitle: "Add Job" }}
        />


        <Stack.Screen
          name="MAIN_TABS"
          component={EmployerTabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EMPLOYER_DASHBOARD"
          component={EmployerDashboardScreen}
          options={{ headerShown: false }} 
        />

        <Stack.Screen
          name="JOBSEEKER_DASHBOARD"
          component={JobSeekerDashboardScreen}
          options={{ headerShown: false }} 
        />




        <Stack.Screen
          name="JOB_DETAILS"
          component={JobDetailsScreen}
          options={{ headerTitle: "Job Details" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}