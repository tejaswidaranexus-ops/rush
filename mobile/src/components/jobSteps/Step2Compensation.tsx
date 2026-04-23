// components/steps/Step2Compensation.tsx

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
  errors: Record<string, string>; 
};

export default function Step2Compensation({ theme, store, errors }: Props) {
  const {
    salary, setSalary,
    paymentFrequency, setPaymentFrequency,
    benefits, setBenefits,
  } = store;

  const options = ["Monthly", "Weekly", "Daily"];

  return (
    <View>
      <Text style={[styles.label, { color: theme.text }]}>
        Compensation
      </Text>

      {/* SALARY */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Salary *
      </Text>
      <TextInput
        value={salary ? salary.toString() : ""}
        onChangeText={(t) => {
          const clean = t.replace(/[^0-9]/g, "");
          setSalary(Number(clean) || 0);
        }}
        keyboardType="numeric"
        placeholder="e.g. 15000"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

      {errors.salary && (
        <Text style={{ color: "red" }}>{errors.salary}</Text>
      )}

      {/* PAYMENT FREQUENCY */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Payment Frequency *
      </Text>
      <View style={styles.chipContainer}>
        {options.map((opt) => {
          const isSelected = paymentFrequency === opt;
          return (
            <TouchableOpacity
              key={opt}
              onPress={() => setPaymentFrequency(opt)}
              style={[
                styles.chip,
                {
                  borderColor: isSelected ? theme.primary : theme.border,
                  backgroundColor: isSelected ? theme.primary : "transparent",
                },
              ]}
            >
              <Text style={{ color: isSelected ? "#fff" : theme.text }}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {errors.paymentFrequency && (
        <Text style={{ color: "red" }}>{errors.paymentFrequency}</Text>
      )}

      {/* BENEFITS */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Benefits
      </Text>
      <TextInput
        value={benefits}
        onChangeText={setBenefits}
        maxLength={200} // ✅ ADD
        placeholder="e.g. PF, Insurance"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

      {errors.benefits && (
        <Text style={{ color: "red" }}>{errors.benefits}</Text>
      )}
    </View>
  );
}