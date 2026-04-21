import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../styles/AddJob.styles";

type Props = {
  theme: any;
  store: any;
};

export default function Step4Employer({ theme, store }: Props) {
  const {
    employerName, setEmployerName,
    contact, setContact,
    eligibility, setEligibility,
    terms, setTerms,
    verification, setVerification,
  } = store;

  return (
    <View>
      <Text style={[styles.label, { color: theme.text }]}>
        Employer Details
      </Text>

      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Employer Name *
      </Text>
      <TextInput
        value={employerName}
        onChangeText={setEmployerName}
        placeholder="Company name"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Contact *
      </Text>
      <TextInput
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
        placeholder="Phone number"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Eligibility
      </Text>
      <TextInput
        value={eligibility}
        onChangeText={setEligibility}
        placeholder="e.g. 10th pass"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Terms
      </Text>
      <TextInput
        value={terms}
        onChangeText={setTerms}
        placeholder="Terms & conditions"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Verification
      </Text>
      <TextInput
        value={verification}
        onChangeText={setVerification}
        placeholder="Verification details"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  );
}