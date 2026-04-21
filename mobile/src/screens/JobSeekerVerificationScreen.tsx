import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import styles from "../styles/JobPreference.styles";
import { useJobSeekerStore } from "../store/JobSeekerStore";

export default function JobSeekerVerificationScreen({ navigation }: any) {
  const theme = useTheme();

  const {
    aadhaarNumber,
    aadhaarFile,
    resume,
    setAadhaarNumber,
    setAadhaarFile,
    setResume,
  } = useJobSeekerStore();

  // 🔥 radio selection
  const [method, setMethod] = useState<"number" | "upload" | "">("");

  // ✅ REAL FILE PICKER
  const pickFile = async (type: "AADHAAR" | "RESUME") => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (result.assets && result.assets.length > 0) {
      const fileName = result.assets[0].name;

      if (type === "AADHAAR") setAadhaarFile(fileName);
      else setResume(fileName);
    }
  };

  // ✅ VALIDATION
  const isValid =
    (method === "number" && aadhaarNumber.length === 12) ||
    (method === "upload" && aadhaarFile);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      {/* TITLE */}
      <Text style={[styles.label, { color: theme.text, fontSize: typography.sizes.xl }]}>
        Verify Your Identity
      </Text>

      <Text style={{ color: theme.placeholder, marginBottom: 20 }}>
        Aadhaar verification is mandatory
      </Text>

      {/* ============================= */}
      {/* 🔥 AADHAAR ONLY */}
      {/* ============================= */}
      <Text style={[styles.label, { color: theme.text }]}>
        Aadhaar Verification (Required)
      </Text>

      {/* RADIO OPTION 1 */}
      <TouchableOpacity
        onPress={() => setMethod("number")}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <FontAwesome
          name={method === "number" ? "dot-circle-o" : "circle-o"}
          size={20}
          color={theme.primary}
        />
        <Text style={{ marginLeft: 10, color: theme.text }}>
          Enter Aadhaar Number
        </Text>
      </TouchableOpacity>

      {/* INPUT */}
      {method === "number" && (
        <TextInput
          placeholder="Enter 12-digit Aadhaar"
          placeholderTextColor="#888"
          keyboardType="numeric"
          maxLength={12}
          value={aadhaarNumber}
          onChangeText={(text) =>
            setAadhaarNumber(text.replace(/[^0-9]/g, ""))
          }
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        />
      )}

      {/* RADIO OPTION 2 */}
      <TouchableOpacity
        onPress={() => setMethod("upload")}
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
      >
        <FontAwesome
          name={method === "upload" ? "dot-circle-o" : "circle-o"}
          size={20}
          color={theme.primary}
        />
        <Text style={{ marginLeft: 10, color: theme.text }}>
          Upload Aadhaar Image
        </Text>
      </TouchableOpacity>

      {/* UPLOAD */}
      {method === "upload" && (
        <TouchableOpacity
          onPress={() => pickFile("AADHAAR")}
          style={{
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: aadhaarFile ? theme.text : theme.placeholder }}>
            {aadhaarFile ? aadhaarFile : "Upload Aadhaar"}
          </Text>

          <FontAwesome name="upload" size={18} color={theme.primary} />
        </TouchableOpacity>
      )}

      {/* NOTE */}
      <Text
        style={{
          color: theme.placeholder,
          fontSize: typography.sizes.xs,
          marginTop: 10,
        }}
      >
        This will be verified by us securely.
      </Text>

      {/* ============================= */}
      {/* 🔥 RESUME (OPTIONAL) */}
      {/* ============================= */}
      <Text style={[styles.label, { color: theme.text, marginTop: 25 }]}>
        Resume (Optional)
      </Text>

      <TouchableOpacity
        onPress={() => pickFile("RESUME")}
        style={{
          padding: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.border,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: resume ? theme.text : theme.placeholder }}>
          {resume ? resume : "Upload Resume"}
        </Text>

        <FontAwesome name="upload" size={18} color={theme.primary} />
      </TouchableOpacity>

      {/* ============================= */}
      {/* 🔥 BUTTON */}
      {/* ============================= */}
      <TouchableOpacity
        disabled={!isValid}
        style={[
          styles.saveButton,
          {
            backgroundColor: isValid ? theme.primary : "#555",
            marginTop: 30,
          },
        ]}
        onPress={() => navigation.replace("JOBSEEKER_DASHBOARD")}
      >
        <Text style={styles.saveText}>Finish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}