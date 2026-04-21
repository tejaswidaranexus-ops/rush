import React, { useState, useLayoutEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native"; 
import CitySearch from "../components/CitySearch";
import { cities } from "../data/constants";

export default function CitySelectionScreen({ navigation, route }: any) {
  const [selected, setSelected] = useState<string[]>(route.params?.city || []);

  const toggleCity = (city: string) => setSelected([...selected, city]);
  const removeCity = (city: string) =>
    setSelected(selected.filter((c) => c !== city));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JOB_PREFERENCE", { city: selected })
          }
        >
          <Text style={{ color: "blue", marginRight: 15 }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, selected]);

  return (
    <View style={{ flex: 1 }}>
      <CitySearch
        cities={cities}
        selected={selected}
        onSelect={toggleCity}
        onRemove={removeCity}
      />
    </View>
  );
}
