import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../styles/AddJob.styles";

type Props = {
  theme: any;
  store: any;
  errors: Record<string, string>;
};

export default function Step4Employer({ theme, store, errors }: Props) {
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
      {errors.employerName && (
        <Text style={{ color: "red" }}>{errors.employerName}</Text>
      )}

      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Contact *
      </Text>
      <TextInput
        value={contact}
        onChangeText={(text) => {
          const clean = text.replace(/[^0-9]/g, "").slice(0, 10);
          setContact(clean);
        }}
        keyboardType="phone-pad"
        maxLength={10}
        placeholder="Phone number"
        placeholderTextColor="#888"
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: errors.contact ? "red" : theme.border,
          },
        ]}
      />
      <Text style={{ color: "#888", alignSelf: "flex-end" }}>
        {(contact?.length || 0)}/10
      </Text>
      {errors.contact && (
        <Text style={{ color: "red" }}>{errors.contact}</Text>
      )}

      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Eligibility
      </Text>
      <TextInput
        value={eligibility}
        onChangeText={setEligibility}
        placeholder="e.g. 10th pass"
        placeholderTextColor="#888"
        //style={[styles.input, { color: theme.text }]}
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: errors.eligibility ? "red" : theme.border,
          },
        ]}
      />
      <Text style={{ color: "#888", alignSelf: "flex-end" }}>
      {(eligibility?.length || 0)}/100
    </Text>
      {errors.eligibility && (
        <Text style={{ color: "red" }}>{errors.eligibility}</Text>
      )}

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
      <Text style={{ color: "#888", alignSelf: "flex-end" }}>
      {(terms?.length || 0)}/300
    </Text>
      {errors.terms && (
        <Text style={{ color: "red" }}>{errors.terms}</Text>
      )}

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
      <Text style={{ color: "#888", alignSelf: "flex-end" }}>
        {(verification?.length || 0)}/200
      </Text>
      {errors.verification && (
        <Text style={{ color: "red" }}>{errors.verification}</Text>
      )}
    </View>
  );
}