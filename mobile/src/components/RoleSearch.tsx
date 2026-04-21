import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import {
  //jobRolesProfessional,
  jobRolesSkilled,
  //otherRoles,
} from "../data/constants";

type RoleSearchProps = {
  selectedRoles: string[];
  onSelect: (role: string) => void;
  onRemove: (role: string) => void;
};

export default function RoleSearch({
  selectedRoles = [],
  onSelect,
  onRemove,
}: RoleSearchProps) {
  const theme = useTheme();
  const [query, setQuery] = useState("");

  // 🔍 Filter helper
  const filterRoles = (roles: string[]) =>
    roles.filter(
      (r) =>
        !selectedRoles.includes(r) &&
        r.toLowerCase().includes(query.toLowerCase())
    );

  //const professional = filterRoles(jobRolesProfessional);
  const skilled = filterRoles(jobRolesSkilled);
  //const other = filterRoles(otherRoles);

  const renderSection = (title: string, data: string[]) => {
    if (data.length === 0) return null;

    return (
      <View style={{ marginBottom: 10 }}>
        {/* Section Title */}
        <Text style={{ color: theme.placeholder, marginBottom: 5 }}>
          {title}
        </Text>

        {/* Chips */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.map((role) => (
            <TouchableOpacity
              key={role}
              onPress={() => onSelect(role)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: theme.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={{ color: theme.text }}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.background }}>
      
      {/* 🔍 SEARCH BAR */}
      <TextInput
        placeholder="Search job role..."
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          padding: 10,
          borderRadius: 8,
          backgroundColor: theme.card,
          color: theme.text,
        }}
        placeholderTextColor={theme.placeholder}
      />

      {/* ✅ SELECTED ROLES */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
        {selectedRoles.map((role) => (
          <View
            key={role}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              margin: 5,
            }}
          >
            <Text style={{ color: "#fff", marginRight: 8 }}>{role}</Text>
            <TouchableOpacity onPress={() => onRemove(role)}>
              <Text style={{ color: "#fff" }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: "#ccc",
          width: "95%",
          alignSelf: "center",
          marginVertical: 10,
        }}
      />

      {/* ✅ SECTIONS */}
      {/*{renderSection("Professional Roles", professional)}*/}
      {renderSection("Skilled Roles", skilled)}
      {/*{renderSection("Other Roles", other)}*/}
    </View>
  );
}