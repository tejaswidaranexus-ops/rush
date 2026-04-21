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
};

export default function Step2Compensation({ theme, store }: Props) {
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
        value={salary?.toString()}
        onChangeText={(t) => setSalary(Number(t) || 0)}
        keyboardType="numeric"
        placeholder="e.g. 15000"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />

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

      {/* BENEFITS */}
      <Text style={[styles.labelStyle, { color: theme.text }]}>
        Benefits
      </Text>
      <TextInput
        value={benefits}
        onChangeText={setBenefits}
        placeholder="e.g. PF, Insurance"
        placeholderTextColor="#888"
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  );
}