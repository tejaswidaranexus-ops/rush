import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { useJobSeekerStore } from "../store/JobSeekerStore";
import styles from "../styles/AddCollegeDetails.styles";

import { saveEducation } from "../services/educationService";

export default function AddCollegeDetailsScreen({ route, navigation }: any) {
  const theme = useTheme();
  const { education } = route.params;

  // 🚀 Skip form for 10th, 12th, None
  useEffect(() => {
    if (education === "10th" || education === "12th" || education === "None") {
      navigation.replace("JOBSEEKER_DASHBOARD");
    }
  }, [education]);


  const {
    institute, setInstitute,
    degree, setDegree,
    specialization, setSpecialization,
    startYear, setStartYear,
    endYear, setEndYear,
    pgInstitute, setPgInstitute,
    pgDegree, setPgDegree,
    pgSpecialization, setPgSpecialization,
    pgStartYear, setPgStartYear,
    pgEndYear, setPgEndYear,
  } = useJobSeekerStore();

  // STATE
  /*const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");*/
  const [yearError, setYearError] = useState("");

  // Masters extra
  /*const [pgInstitute, setPgInstitute] = useState("");
  const [pgDegree, setPgDegree] = useState("");
  const [pgSpecialization, setPgSpecialization] = useState("");
  const [pgStartYear, setPgStartYear] = useState("");
  const [pgEndYear, setPgEndYear] = useState("");*/

  useEffect(() => {
      if (startYear && endYear) {
        const start = Number(startYear);
        const end = Number(endYear);

        if (!start || !end) return;

        const diff = end - start;

      if (diff < 3) {
        setYearError("Duration must be at least 3 years");
      } else if (diff > 4) {
        setYearError("Duration must not exceed 4 years");
      } else {
        setYearError(""); // valid (3 or 4 years)
      }
    } else {
      setYearError(""); // reset if incomplete
    }
  }, [startYear, endYear]);



  // VALIDATION
  const start = Number(startYear);
  const end = Number(endYear);
  const diff = end - start;

  const isBachelorValid =
    startYear.toString().length === 4 &&
    endYear.toString().length === 4 &&
    (diff === 3 || diff === 4);


  const pgStart = Number(pgStartYear);
  const pgEnd = Number(pgEndYear);
  const pgDiff = pgEnd - pgStart;

  const isMasterValid =
    pgStartYear.toString().length === 4 &&
    pgEndYear.toString().length === 4 &&
    pgDiff === 2;

  let isValid = institute && degree && isBachelorValid;
  if (education === "Master's") {
    isValid =
      isValid &&
      pgInstitute &&
      pgDegree &&
      isMasterValid;
  }

  return (
    //<SafeAreaView style={{ flex: 1, backgroundColor: theme.background, paddingTop: 0 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ padding: 20 }}
      >

        <Text
              style={[
                styles.label,
                { color: theme.primary, marginTop: 10, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold },
              ]}
            >
              Graduation Details
        </Text>
          
        {/* UG Section */}
        <Text style={[styles.label, { color: theme.text }]}>Institute Name</Text>
        <TextInput
          placeholder="Enter institute name"
          placeholderTextColor="#888"
          value={institute}
          onChangeText={setInstitute}
          style={[styles.input, { color: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>Degree</Text>
        <TextInput
          placeholder="Enter degree"
          placeholderTextColor="#888"
          value={degree}
          onChangeText={setDegree}
          style={[styles.input, { color: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>Specialization</Text>
        <TextInput
          placeholder="Optional"
          placeholderTextColor="#888"
          value={specialization}
          onChangeText={setSpecialization}
          style={[styles.input, { color: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>Start Year</Text>
        <TextInput
          placeholder="e.g. 2020"
          placeholderTextColor="#888"
          value={startYear ? startYear.toString() : ""}
          onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, "").slice(0, 4);
                setStartYear(cleaned ? Number(cleaned) : 0);
              }}
          keyboardType="numeric"
          maxLength={4}
          style={[styles.input, { color: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>End Year</Text>
        <TextInput
          placeholder="e.g. 2024"
          placeholderTextColor="#888"
          value={endYear ? endYear.toString() : ""}
          onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, "").slice(0, 4);
                setEndYear(cleaned ? Number(cleaned) : 0);
              }}
          keyboardType="numeric"
          maxLength={4}
          style={[styles.input, { color: theme.text }]}
        />

        {yearError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{yearError}</Text>
        ) : null}


        {!isBachelorValid &&
          startYear !== 0 &&
          endYear !== 0 &&
          education === "Bachelor's" && (
            <Text style={{ color: "red", marginTop: 5 }}>
              Bachelor's must be 3 or 4 years
            </Text>
        )}


        {/* Masters Section */}
        {education === "Master's" && (
          <>
            <Text
              style={[
                styles.label,
                { color: theme.primary, marginTop: 30, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold },
              ]}
            >
              Post Graduation Details
            </Text>

            <Text style={[styles.label, { color: theme.text }]}>Institute Name</Text>
            <TextInput
              placeholder="Enter PG institute"
              placeholderTextColor="#888"
              value={pgInstitute}
              onChangeText={setPgInstitute}
              style={[styles.input, { color: theme.text }]}
            />

            <Text style={[styles.label, { color: theme.text }]}>Degree</Text>
            <TextInput
              placeholder="Enter PG degree"
              placeholderTextColor="#888"
              value={pgDegree}
              onChangeText={setPgDegree}
              style={[styles.input, { color: theme.text }]}
            />

            <Text style={[styles.label, { color: theme.text }]}>Specialization</Text>
            <TextInput
              placeholder="Optional"
              placeholderTextColor="#888"
              value={pgSpecialization}
              onChangeText={setPgSpecialization}
              style={[styles.input, { color: theme.text }]}
            />

            <Text style={[styles.label, { color: theme.text }]}>Start Year</Text>
            <TextInput
              placeholder="e.g. 2024"
              placeholderTextColor="#888"
              value={pgStartYear ? pgStartYear.toString() : ""}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, "").slice(0, 4);
                setPgStartYear(cleaned ? Number(cleaned) : 0);
              }}
              keyboardType="numeric"
              maxLength={4}
              style={[styles.input, { color: theme.text }]}
            />

            <Text style={[styles.label, { color: theme.text }]}>End Year</Text>
            <TextInput
              placeholder="e.g. 2026"
              placeholderTextColor="#888"
              value={pgEndYear ? pgEndYear.toString() : ""}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, "").slice(0, 4);
                setPgEndYear(cleaned ? Number(cleaned) : 0);
              }}
              keyboardType="numeric"
              maxLength={4}
              style={[styles.input, { color: theme.text }]}
            />

            {!isMasterValid && pgStartYear !== 0 && pgEndYear !== 0  && (
              <Text style={{ color: "red", marginTop: 5 }}>
                Master's must be exactly 2 years
              </Text>
            )}
          </>
        )}

        {/* Save Button */}
        <TouchableOpacity
          disabled={!isValid}
          style={[
            styles.saveButton,
            { backgroundColor: isValid ? theme.primary : "#555" },
          ]}
          onPress={async () => {
          try {
            console.log("Saving education...");

            const payload: any = {
              education_list: [
                {
                  education_level: "bachelors",
                  institute_name: institute,
                  degree: degree,
                  specialization: specialization,
                  start_year: Number(startYear),
                  end_year: Number(endYear),
                }
              ]
            };

            // 🔥 if Master's
            if (education === "Master's") {
              payload.education_list.push({
                education_level: "masters",
                institute_name: pgInstitute,
                degree: pgDegree,
                specialization: pgSpecialization,
                start_year: Number(pgStartYear),
                end_year: Number(pgEndYear),
              });
            }

            console.log("Payload:", payload);

            const res = await saveEducation(payload);

            console.log("Education saved:", res);

            navigation.replace("JOB_PREFERENCE");

          } catch (error) {
            console.log("Education error:", error);
          }
        }}
        >
          <Text style={styles.saveText}>Proceed</Text>
        </TouchableOpacity>

      </ScrollView>
    //</SafeAreaView>
  );
}
