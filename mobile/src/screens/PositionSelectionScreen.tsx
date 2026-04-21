import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import RoleSearch from "../components/RoleSearch";
import { useJobSeekerStore } from "../store/JobSeekerStore";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";

export default function PositionSelectionScreen({ route, navigation }: any) {
  const theme = useTheme();
  const [error, setError] = useState("");

  const { jobPosition, setJobPosition } = useJobSeekerStore();

  useEffect(() => {
    if (route.params?.selectedRoles) {
      setJobPosition(route.params.selectedRoles);
    }
  }, [route.params]);

  const toggleRole = (role: string) => {
    if (jobPosition.includes(role)) {
      setJobPosition(jobPosition.filter((r) => r !== role));
    } else {
      if (jobPosition.length >= 5) {
        setError("You can select a maximum of 5 roles");
        return;
      }
      setJobPosition([...jobPosition, role]);
      setError(""); // clear error
    }
  };

  const removeRole = (role: string) => {
    setJobPosition(jobPosition.filter((r) => r !== role));
  };

  return (
    <View style={{ flex: 1 }}>
      
      <RoleSearch
        selectedRoles={jobPosition}
        onSelect={toggleRole}
        onRemove={removeRole}
      />

        {error ? (
          <Text style={{ color: "red", marginHorizontal: 20, marginTop: 5 }}>
            {error}
          </Text>
        ) : null}

      {/* ✅ DONE BUTTON */}
      <TouchableOpacity
        onPress={() => {
          if (jobPosition.length < 1) {
            setError("Select at least 1 roles");
            return;
          }
          navigation.goBack();
        }}
        style={{
          backgroundColor: theme.primary,
          margin: 20,
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: typography.weights.bold }}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
}