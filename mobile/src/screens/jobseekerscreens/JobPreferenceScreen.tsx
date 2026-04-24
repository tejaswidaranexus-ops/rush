import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../styles/JobPreference.styles"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useJobSeekerStore } from "../../store/JobSeekerStore";
import { jobRolesSkilled } from "../../data/constants";

import { savePreferences } from "../../services/preferencesService";

export default function JobPreferenceScreen({ route, navigation }: any) {
  const theme = useTheme();

  const {
    jobType, setJobType,
    //workType, setWorkType,
    salary, setSalary,
    jobPosition = [], setJobPosition,
    selectedCities, setSelectedCities,
  } = useJobSeekerStore();

  // ✅ Sync route params into store
  useEffect(() => {
    if (route.params?.city) {
      const newCities = route.params.city;
      if (Array.isArray(newCities)) {
        setSelectedCities(newCities);
      } else {
        if (!selectedCities.includes(newCities)) {
          setSelectedCities([...selectedCities, newCities]);
        }
      }
    }

  }, [route.params, selectedCities, setSelectedCities, setJobPosition]);


  const toggleRole = (role: string) => {
    const current = jobPosition || [];
    if (current.includes(role)) {
      setJobPosition(current.filter((r) => r !== role));
    } else {
      setJobPosition([...current, role]);
    }
  };

  const removeRole = (role: string) => {
    const current = jobPosition || [];
    setJobPosition(current.filter((r) => r !== role));
  };


  const toggleCity = (city: string) => {
  const current = selectedCities || [];
  if (current.includes(city)) {
    setSelectedCities(current.filter((c) => c !== city));
  } else {
    setSelectedCities([...current, city]);
  }
};


  const isValid = Boolean(
    jobType &&
    //workType &&
    jobPosition.length > 0 &&
    salary &&
    selectedCities.length > 0
  );

  const positions = [...jobRolesSkilled];

  return (
    //<SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={styles.container}
      >
        {/* JOB TYPE */}
        <Text style={[styles.label, { color: theme.text }]}>Choose Job Type</Text>
        <View style={styles.row}>
          {["Full-time", "Hourly Work", "Internship"].map((item) => {
            const selected = jobType === item;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => setJobType(item)}
                style={[
                  styles.chip,
                  {
                    borderColor: theme.border,
                    backgroundColor: selected ? theme.primary : "transparent",
                  },
                ]}
              >
                <Text style={{ color: selected ? "#fff" : theme.text }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* WORK TYPE */}
        {/*
        <Text style={[styles.label, { color: theme.text }]}>Select Category</Text>
        {[
          { label: "Professional", icon: "briefcase" },
          { label: "Skilled Work", icon: "wrench" },
          { label: "Both", icon: "users" },
        ].map((item) => {
          const selected = workType === item.label;
          return (
            <TouchableOpacity
              key={item.label}
              onPress={() => setWorkType(item.label)}
              style={[
                styles.option,
                {
                  borderColor: selected ? theme.primary :theme.secondaryborder,
                  backgroundColor: selected ? theme.primary : "transparent",
                },
              ]}
            >
              <FontAwesome
                name={item.icon as any}
                size={20}
                color={selected ? "#fff" : theme.text}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: selected ? "#fff" : theme.placeholder,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
          */}

        {/* JOB POSITION */}
        <Text style={[styles.label, { color: theme.text }]}>Job Position</Text>

        {jobPosition.length > 0 && (
          <View style={styles.row}>
            {jobPosition.map((role) => (
              <View
                key={role}
                style={[
                  styles.chip,
                  {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={{ color: "#fff", marginRight: 8 }}>{role}</Text>
                <TouchableOpacity onPress={() => removeRole(role)}>
                  <Text style={{ color: "#fff" }}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Navigate to Search Screen */}
        <TouchableOpacity
          style={[styles.searchButton, { borderColor: theme.border }]}
          onPress={() =>
            navigation.navigate("POSITION_SELECTION", {
              selectedRoles: jobPosition,
            })
          }
        >
          <Text style={{ color: theme.placeholder }}>
            {jobPosition.length > 0
              ? `${jobPosition.length} roles selected`
              : "Search Job Position"}
          </Text>
        </TouchableOpacity>

        {/* SALARY */}
        <Text style={[styles.label, { color: theme.text }]}>
          Expected Salary (₹ / month)
        </Text>
        <TextInput
          placeholder="Enter amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={salary ? salary.toString() : ""}
          onChangeText={(text) => setSalary(Number(text) || 0)}
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        />

        {/* CITIES */}
        <Text style={[styles.label, { color: theme.text, margin: 0, }]}>Preferred Cities</Text>
        {selectedCities.length > 0 && (
          <View style={styles.row}>
            {selectedCities.map((city) => (
              <View
                key={city}
                style={[
                  styles.chip,
                  { backgroundColor: theme.primary, borderColor: theme.primary, flexDirection: "row", alignItems: "center" }
                ]}
              >
                <Text style={{ color: "#fff", marginRight: 8 }}>{city}</Text>
                <TouchableOpacity onPress={() => toggleCity(city)}>
                  <Text style={{ color: "#fff" }}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Navigate to City Search Screen */}
        <TouchableOpacity
          style={[styles.searchButton, { borderColor: theme.border }]}
          onPress={() =>
            navigation.navigate("CITY_SELECTION", { city: selectedCities })
          }
        >
          <Text style={{ color: theme.placeholder }}>
            {selectedCities.length > 0 ? "Edit Cities" : "Search City"}
          </Text>
        </TouchableOpacity>

        {/* BUTTON */}
        <TouchableOpacity
          disabled={!isValid}
          style={[
            styles.saveButton,
            { backgroundColor: isValid ? theme.primary : "#555" },
          ]}
          onPress={async () => {
            try {
              console.log("Saving preferences...");

              const payload = {
                job_type: jobType ? [jobType.toLowerCase()] : [], // ✅ convert to array
                job_positions: jobPosition.map((r) => r.toLowerCase()),
                expected_salary: Number(salary),
                preferred_cities: selectedCities.map((c) => c.toLowerCase())
                
              };

              console.log("Payload:", payload);

              const res = await savePreferences(payload);

              console.log("Preferences saved:", res);

              navigation.replace("JOBSEEKER_DASHBOARD");

            } catch (error) {
              console.log("Preferences error:", error);
            }
          }}
        >
          <Text style={styles.saveText}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    //</SafeAreaView>
  );
}
