// components/jobSteps/Step1BasicInfo.tsx

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/AddJob.styles";

type Props = {
  theme: any;
  store: any;
  onOpenDomain: () => void;
  onOpenRole: () => void;
  errors: Record<string, string>;
};

export default function Step1BasicInfo({
  theme,
  store,
  onOpenDomain,
  onOpenRole,
  errors,
}: Props) {
  const {
    title, setTitle,
    domain,
    role,
    description, setDescription,
    skills, setSkills,
    openings, setOpenings,
  } = store;

  return (
    <View>
      <Text style={[styles.label, { color: theme.text }]}>
        Basic Info
      </Text>

      {/* TITLE */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Job Title *
      </Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Delivery Executive"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />
      {errors.title && <Text style={{ color: "red" }}>{errors.title}</Text>}

      {/* DOMAIN */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Domain *
      </Text>
      <TouchableOpacity
        onPress={onOpenDomain}
        style={[styles.input, { justifyContent: "center" }]}
      >
        <Text style={{ color: domain ? theme.text : "#888" }}>
          {domain || "Select Domain"}
        </Text>
      </TouchableOpacity>
      {errors.domain && <Text style={{ color: "red" }}>{errors.domain}</Text>}

      {/* ROLE */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Role *
      </Text>
      <TouchableOpacity
        onPress={onOpenRole}
        style={[styles.input, { justifyContent: "center" }]}
      >
        <Text style={{ color: role ? theme.text : "#888" }}>
          {role || "Select Role"}
        </Text>
      </TouchableOpacity>
      {errors.role && <Text style={{ color: "red" }}>{errors.role}</Text>}


      {/* DESCRIPTION */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Description
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Describe job role..."
        multiline
        maxLength={500}
        placeholderTextColor="#888"
        style={[styles.input, { minHeight: 80, color: theme.text }]}
      />

      <Text style={{ color: "#888", alignSelf: "flex-end" }}>
        {(description?.length || 0)}/500
      </Text>

      {errors.description && (
        <Text style={{ color: "red" }}>{errors.description}</Text>
      )}

      {/* SKILLS */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Skills
      </Text>
      <TextInput
        value={skills}
        onChangeText={setSkills}
        maxLength={200}
        placeholder="e.g. driving, communication (comma or space separated)"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />
      {errors.skills && (
        <Text style={{ color: "red" }}>{errors.skills}</Text>
      )}

      {/* OPENINGS */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Openings *
        </Text>

        <View style={[styles.openingsRow, { borderColor: "#555"}]}>
        <Text onPress={() => setOpenings(Math.max(0, openings - 1))}>➖</Text>
        <TextInput
            value={openings.toString()}
            //onChangeText={(t) => setOpenings(Number(t) || 0)}
            onChangeText={(t) => {
              const num = t.replace(/[^0-9]/g, "");
              setOpenings(num ? Number(num) : 0);
            }}
            keyboardType="numeric"
            style={[styles.openingsText, { color: theme.text }]}
        />
        <Text onPress={() => setOpenings(openings + 1)}>➕</Text>
        </View>
        {errors.openings && <Text style={{ color: "red" }}>{errors.openings}</Text>}


    </View>
  );
}