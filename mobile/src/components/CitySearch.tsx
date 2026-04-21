import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../constants/theme/colors";
import { useTheme } from "../hooks/useTheme";

export default function CitySearch({ cities, selected, onSelect, onRemove }: any) {
  const theme = useTheme();
  const [query, setQuery] = useState("");

  const filteredUnselected = cities.filter(
    (c: string) =>
      !selected.includes(c) &&
      c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search city..."
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          borderColor: COLORS.borderLight,
          padding: 10,
          borderRadius: 8,
          backgroundColor: COLORS.cardLight,
          color: COLORS.textLight,
        }}
        placeholderTextColor={COLORS.borderDark}
      />

      {/* Selected Cities (Ovals) */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
        {selected.map((city: string) => (
          <View
            key={city}
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
            <Text style={{ color: COLORS.textDark, marginRight: 8 }}>{city}</Text>
            <TouchableOpacity onPress={() => onRemove(city)}>
              <Text style={{ color: COLORS.textDark }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{ height: 1, backgroundColor: "#ccc", width: "95%", alignSelf: "center", marginVertical: 10 }} />

      {/* Unselected Cities (Ovals, softer style) */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
        {filteredUnselected.map((city: string) => (
          <TouchableOpacity
            key={city}
            onPress={() => onSelect(city)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: theme.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              margin: 5,
            }}
          >
            <Text style={{ color: theme.text }}>{city}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
