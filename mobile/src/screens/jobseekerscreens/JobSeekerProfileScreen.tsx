import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { typography } from "../../styles/typography";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "react-native";
import { useJobSeekerStore } from "../../store/JobSeekerStore";
import Slider from "@react-native-community/slider";
import styles from "../../styles/JobSeekerProfile.styles";

import UploadModal from "../../components/UploadModal";
import { useFileUpload } from "../../hooks/useFileUpload";

import { upsertJobseekerProfile } from "../../services/jobseekerService";

import { validateForm } from "../../validation/validate";
import { jobseekerSchema } from "../../validation/jobseeker";

import FormScreenWrapper from "../../components/FormScreenWrapper";



const getExperienceLabel = (value: number) => {
  if (value <= 1) return "0-1 years";
  if (value <= 2) return "1-2 years";
  if (value <= 3) return "2-3 years";
  if (value <= 4) return "3-4 years";
  if (value <= 5) return "4-5 years";
  if (value <= 6) return "5-6 years";
  if (value <= 7) return "6-7 years";
  if (value <= 8) return "7-8 years";
  if (value <= 9) return "8-9 years";
  if (value <= 10) return "9-10 years";
  if (value <= 11) return "10-11 years";
  if (value <= 12) return "11-12 years";
  if (value <= 13) return "12-13 years";
  if (value <= 14) return "13-14 years";
  if (value <= 15) return "14-15 years";
  return "15+ years";
};


export default function JobSeekerProfileScreen({ navigation }: any) {
  const theme = useTheme();

  //Store
    const {
      profileImage, setProfileImage,
      name, setName,
      gender, setGender,
      dob, setDob,
      location, setLocation,
      pincode, setPincode,
      education, setEducation,
      experience, setExperience,
    } = useJobSeekerStore();

  // FORM STATE
  //const [name, setName] = useState("");
  //const [gender, setGender] = useState("");
  //const [location, setLocation] = useState("");
  //const [pincode, setPincode] = useState("");
  //const [education, setEducation] = useState("");
  //const [experience, setExperience] = useState("");
  const [experienceValue, setExperienceValue] = useState(0);
  //const [pincodeError, setPincodeError] = useState("");
  const [showPicker, setShowPicker] = useState(false);  
  const [showModal, setShowModal] = useState(false);

  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { pickFiles } = useFileUpload();
  

  // VALIDATION
  const isFormValid =
    name.trim().length > 0 &&
    gender &&
    dob &&
    location.trim().length > 0 &&
    education &&
    experience &&
    pincode.length === 6 && /^[0-9]{6}$/.test(pincode);
    //pincode >= 100000 &&
    //pincode <= 999999;

  const pickProfileImage = async () => {
    const files = await pickFiles("gallery", "profile");

    if (files.length > 0) {
      setProfileImage(files[0].uri);
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const handleUpload = async (source: "camera" | "gallery" | "files") => {
    const files = await pickFiles(source, "profile");

    if (files.length > 0) {
      setProfileImage(files[0].uri);
    }
  };


  return (
    //<SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
    <View style={{ flex: 1 }}>
      <FormScreenWrapper>
        <ScrollView
            style={{ flex: 1, backgroundColor: theme.background }}
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
            >
        {/* PROFILE IMAGE */}
        <View style={styles.profileRow}>
          
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <View style={styles.profileWrapper}>

              {/* PROFILE CIRCLE */}
              <View
                style={[
                  styles.profileCircle,
                  {
                    backgroundColor: theme.mode === "dark" ? "#333" : "#ddd",
                    borderColor: theme.primary,
                    overflow: "hidden",
                  },
                ]}
              >
                {profileImage && profileImage.length > 0 ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <FontAwesome
                    name="user"
                    size={30}
                    color={theme.mode === "dark" ? "#fff" : "#000"}
                  />
                )}
              </View>

              {/* EDIT ICON (NOW OUTSIDE) */}
              <View style={[styles.editIcon, { backgroundColor: theme.primary }]}>
                <FontAwesome name="edit" size={14} color="#fff" />
              </View>

            </View>
          </TouchableOpacity>

          {/* Column 2 */}
          <View style={styles.textColumn}>
            <Text style={[styles.label, { color: theme.text, marginTop: 0 }]}>
              Add profile picture
            </Text>
            <Text style={styles.subText}>
              Professional profile picture helps you stand out among other employers
            </Text>
          </View>
        </View>


        {/* NAME */}
        <Text style={[styles.label, { color: theme.text }]}>Full Name *</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={(text) => {
            setName(text);

            if (errors.name) {
              setErrors(prev => ({ ...prev, name: "" }));
            }
          }}
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        />

        {errors.name && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {String(errors.name)}
          </Text>
        )}

        {/* GENDER */}
        <Text style={[styles.label, { color: theme.text }]}>Gender *</Text>
        <View style={styles.genderRow}>
          {["Male", "Female", "Other"].map((g) => {
            const isSelected = gender === g;
            return (
              <TouchableOpacity
                key={g}
                onPress={() => {
                  setGender(g);

                  if (errors.gender) {
                    setErrors(prev => ({ ...prev, gender: "" }));
                  }
                }}
                style={[
                  styles.genderButton,
                  {
                    borderColor: theme.primary, 
                    backgroundColor: isSelected ? theme.primary : "transparent", 
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelected
                      ? theme.mode === "dark"
                        ? "#000" // dark mode 
                        : "#fff" // light mode 
                      : theme.primary, // unselected 
                    fontWeight: isSelected ? typography.weights.bold : typography.weights.regular,
                  }}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {errors.gender && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {String(errors.gender)}
          </Text>
        )}


        <Text style={[styles.label, { color: theme.text }]}>
          Date of Birth *
        </Text>

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={[
            styles.input,
            { justifyContent: "center", borderColor: theme.border },
          ]}
        >
          <Text style={{ color: dob ? theme.text : "#888" }}>
            {dob || "Select Date (YYYY-MM-DD)"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={dob ? new Date(dob) : new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}

            onChange={(event, selectedDate) => {
              setShowPicker(false);

              if (selectedDate) {
                setDob(formatDate(selectedDate));

                if (errors.dob) {
                  setErrors(prev => ({ ...prev, dob: "" }));
                }
              }
            }}
          />
        )}

        {errors.dob && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {String(errors.dob)}
          </Text>
        )}

        {/* LOCATION */}
        <Text style={[styles.label, { color: theme.text }]}>Current Location *</Text>
        <TextInput
          placeholder="Enter address"
          placeholderTextColor="#888"
          value={location}
          onChangeText={(text) => {
            setLocation(text);

            if (errors.location) {
              setErrors(prev => ({ ...prev, location: "" }));
            }
          }}
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        />

        {errors.location && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {String(errors.location)}
          </Text>
        )}

       <TextInput
          placeholder="Pincode"
          placeholderTextColor="#888"
          value={pincode ? pincode.toString() : ""}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, "").slice(0, 6);
            setPincode(numericText);

            if (errors.pincode) {
              setErrors(prev => ({ ...prev, pincode: "" }));
            }
          }}

          keyboardType="numeric"
          maxLength={6}
          style={[
            styles.input,
            {
              marginTop: 10,
              color: theme.text,
              borderColor: errors.pincode ? "red" : theme.border,
            },
          ]}
        />

        {/* 👇 ADD THIS HERE (helper, not error) */}
        {pincode && pincode.toString().length < 6 && (
          <Text style={{ color: "#999", fontSize: 12, marginTop: 4 }}>
            Enter 6 digit pincode
          </Text>
        )}

        {/* 👇 ACTUAL ERROR (only after submit) */}
        {errors.pincode && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {String(errors.pincode)}
          </Text>
        )}

        {/* EDUCATION */}
        <Text style={[styles.label, { color: theme.text }]}>Education *</Text>
        <TouchableOpacity 
          onPress={() => setShowEducation(true)}
          style={[styles.selectBox, { borderColor: theme.border }]}
        >
          <Text style={{ color: education ? theme.text : "#888", }}>
            {education || "Select education"}
          </Text>
        </TouchableOpacity>

        {errors.education && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {String(errors.education)}
          </Text>
        )}

        {/* EXPERIENCE */}
        {/*onValueChange={(val) => {
            setExperienceValue(val);
            setExperience(val);

            if (errors.experience) {
              setErrors(prev => ({ ...prev, experience: "" }));
            }
          }}*/}
        <Text style={[styles.label, { color: theme.text }]}>Previous Employment *</Text>
        <TouchableOpacity onPress={() => setShowExperience(true)} style={[styles.selectBox, {borderColor: theme.border}]}>
          <Text style={{ color: experience ? theme.text : "#888" }}>
            {experience ? getExperienceLabel(experience) : "Select experience"}
          </Text>
        </TouchableOpacity>

        {errors.experience && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {String(errors.experience)}
          </Text>
        )}

        {/* SAVE BUTTON */}
        <TouchableOpacity
          disabled={!isFormValid}
          style={[
            styles.saveButton,
            { backgroundColor: isFormValid ? theme.primary : theme.disable },
          ]}
          onPress={async () => {
            const data = {
              name,
              location,
              pincode: pincode?.toString(),
              gender,
              dob,
              education,
              experience,
            };

            const validationErrors = validateForm(data, jobseekerSchema);
            setErrors(validationErrors);

            // 🔴 stop if errors
            if (Object.keys(validationErrors).length > 0) {
              return;
            }


            try {
              const payload = {
                full_name: name.trim(),
                profile_image_url: profileImage || null,
                gender: gender.toLowerCase(),
                dob,
                location_name: location.trim(),
                latitude: 0,
                longitude: 0,
                pincode: pincode,
                education_level: education,
                experience: experience,
              };

              const res = await upsertJobseekerProfile(payload);

              if (
                education === "10th" ||
                education === "12th" ||
                education === "None"
              ) {
                navigation.navigate("JOB_PREFERENCE", { fromProfile: true });
              } else {
                navigation.navigate("ADD_COLLEGE", { education });
              }

            } catch (error) {
              console.log("Profile save error:", error);
            }
          }}
        >
          <Text style={styles.saveText}>Proceed</Text>
        </TouchableOpacity>
        


        {/* EDUCATION MODAL */}
        {showEducation && (
          <View style={[styles.bottomSheet, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={() => setShowEducation(false)} style={styles.closex}>
              <Text style={{ color: theme.text, fontSize: typography.sizes.lg }}>✕</Text>
            </TouchableOpacity>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>
              What is your highest education?
            </Text>
            {["10th", "12th", "Bachelor's", "Master's", "None"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setEducation(item);
                setShowEducation(false);

                if (errors.education) {
                  setErrors(prev => ({ ...prev, education: "" }));
                }
              }}
            >
                <Text style={[styles.sheetText, { color: theme.text }]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* EXPERIENCE MODAL */}
        {showExperience && (
        <View style={[styles.bottomSheet, { backgroundColor: theme.card }]}>

          {/* HEADER */}
          <TouchableOpacity
            onPress={() => setShowExperience(false)}
            style={styles.closex}
          >
            <Text style={{ color: theme.text, fontSize: typography.sizes.lg }}>Save</Text>
          </TouchableOpacity>

          <Text style={[styles.sheetTitle, { color: theme.text }]}>
            How much Experience do you have?
          </Text>

          {/* DISPLAY */}
          <Text
            style={{
              textAlign: "center",
              fontSize: typography.sizes.xl,
              fontWeight: typography.weights.bold,
              color: theme.primary,
              marginVertical: 20,
            }}
          >
            {getExperienceLabel(experienceValue)}
          </Text>

          {/* SLIDER */}
          <Slider
            minimumValue={0}
            maximumValue={16}
            step={1}
            value={experienceValue}
            onValueChange={(val) => {
              setExperienceValue(val);
              setExperience(val);
            }}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor="#ccc"
            thumbTintColor={theme.primary}
          />

          {/* SCALE LABELS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ color: theme.text }}>0</Text>
            <Text style={{ color: theme.text }}>5</Text>
            <Text style={{ color: theme.text }}>10</Text>
            <Text style={{ color: theme.text }}>15+</Text>
          </View>

        </View>
      )}
      
      </ScrollView>
    </FormScreenWrapper>

      <UploadModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(source) => handleUpload(source)}
        theme={theme}
        title="Upload Profile Photo"

        allowRemove={!!profileImage} // 👈 only show if image exists
        onRemove={() => {
         setProfileImage(""); // 👈 remove image
        }}
      />
      </View>
    //</SafeAreaView>
  );
}