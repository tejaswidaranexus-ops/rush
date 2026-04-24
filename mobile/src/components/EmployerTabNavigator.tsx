import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../hooks/useTheme";

import EmployerDashboardScreen from "../screens/employerscreens/EmployerDashboardScreen";
import EmployerJobsScreen from "../screens/jobscreens/EmployerJobsScreen";

// TEMP screens (replace later if you have real ones)
import { Text } from "react-native";

function ChatScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chat</Text>
    </View>
  );
}

function RusherScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Rusher</Text>
    </View>
  );
}

function AddJobScreen() {
  return null;
}

const Tab = createBottomTabNavigator();

export default function EmployerTabNavigator({ navigation }: any) {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="DASHBOARD"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderColor: theme.border,
          height: 75,
          paddingBottom: 10,
          paddingTop: 5,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 4,
        },

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,

        tabBarIcon: ({ color }) => {
          let iconName: any;

          if (route.name === "DASHBOARD") iconName = "grid-outline";
          if (route.name === "RUSHER") iconName = "flash-outline";
          if (route.name === "CHAT") iconName = "chatbubble-outline";
          if (route.name === "JOBS") iconName = "briefcase-outline";

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >

      {/* 1. DASHBOARD */}
      <Tab.Screen name="DASHBOARD" component={EmployerDashboardScreen} />

      {/* 2. RUSHER */}
      <Tab.Screen name="RUSHER" component={RusherScreen} />

      {/* 3. CENTER + BUTTON */}
      <Tab.Screen
        name="ADD"
        component={AddJobScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => null,

          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ADD_JOB")}
              style={{
                top: -25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 31,
                  backgroundColor: theme.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: 6,
                }}
              >
                <Ionicons name="add" size={40} color="#fff" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      {/* 4. CHAT */}
      <Tab.Screen name="CHAT" component={ChatScreen} />

      {/* 5. JOBS */}
      <Tab.Screen name="JOBS" component={EmployerJobsScreen} />
    </Tab.Navigator>
  );
}