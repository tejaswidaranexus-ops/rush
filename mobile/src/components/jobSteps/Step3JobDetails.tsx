import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../styles/AddJob.styles";

type Props = {
  theme: any;
  store: any;
};

export default function Step3JobDetails({ theme, store }: Props) {

    const {
    jobLocation, setJobLocation,
    jobPincode, setJobPincode,
    workType, setWorkType,
    shift, setShift,
    duration, setDuration,
    } = store;


  const [pincodeError, setPincodeError] = useState("");

  // 🔁 Reusable chip group (same as your screen)
  const ChipGroup = ({
    options,
    selected,
    onSelect,
  }: {
    options: string[];
    selected: string;
    onSelect: (val: string) => void;
  }) => (
    <View style={styles.chipContainer}>
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <Text
            key={opt}
            onPress={() => onSelect(opt)}
            style={[
              styles.chip,
              {
                borderColor: isSelected ? theme.primary : theme.border,
                backgroundColor: isSelected ? theme.primary : "transparent",
                color: isSelected ? "#fff" : theme.text,
                padding: 8,
                margin: 4,
                borderRadius: 20,
              },
            ]}
          >
            {opt}
          </Text>
        );
      })}
    </View>
  );

  return (
    <View>
      <Text style={[styles.label, { color: theme.text }]}>
        Job Location & Details
      </Text>

      {/* LOCATION */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>Location *</Text>
      <TextInput
        value={jobLocation}
        onChangeText={setJobLocation}
        placeholder="City / Area"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

      {/* PINCODE */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>Pincode *</Text>
      <TextInput
        value={jobPincode?.toString()}
        onChangeText={(text) => {
          const clean = text.replace(/[^0-9]/g, "").slice(0, 6);
          setJobPincode(Number(clean));
          setPincodeError(clean.length === 6 ? "" : "Invalid pincode");
        }}
        keyboardType="numeric"
        placeholder="6-digit pincode"
        placeholderTextColor="#888"
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: pincodeError ? "red" : theme.border,
          },
        ]}
      />
      {pincodeError ? (
        <Text style={{ color: "red" }}>{pincodeError}</Text>
      ) : null}

      {/* WORK TYPE */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>Work Type *</Text>
      <ChipGroup
        options={["Full-time", "Part-time", "Internship"]}
        selected={workType}
        onSelect={setWorkType}
      />

      {/* SHIFT */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>Shift *</Text>
      <ChipGroup
        options={["Day", "Night", "Flexible"]}
        selected={shift}
        onSelect={setShift}
      />

      {/* DURATION */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>Duration</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        placeholder="e.g. 3 months"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  );
}