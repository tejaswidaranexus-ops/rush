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
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { typography } from "../../styles/typography";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";
import { useEmployerStore, type FileType } from "../../store/employerStore";
import { Image } from "react-native";
import styles from "../../styles/EmployerProfile.styles";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

import { saveEmployerProfile } from "../../services/employerService";

import UploadModal from "../../components/UploadModal";
import { useFileUpload } from "../../hooks/useFileUpload";

import { getEmployerProfile } from "../../services/employerService";

import { validateField, validateForm } from "../../validation/validate";
import {
  fullNameRules,
  businessNameRules,
  locationRules,
  emailRules,
} from "../../validation/rules";
import { EmployerSchema } from "../../validation/employer";

import FormScreenWrapper from "../../components/FormScreenWrapper";
import ProfileImagePicker from "../../components/ProfileImagePicker";



export default function EmployerProfileCreateScreen() {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [pincodeError, setPincodeError] = useState("");
  const [duplicateError, setDuplicateError] = useState("");

  const [uploadType, setUploadType] = useState<"profile" | "proof" | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);


  const {
    profileImage, setProfileImage,
    name, setName,
    gender, setGender,
    business, setBusiness,
    location, setLocation,
    pincode, setPincode,
    email, setEmail,
    noEmail, setNoEmail,
    businessProofs,setBusinessProofs,

    setFirstTimeFlow,
  } = useEmployerStore();



  /*const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [business, setBusiness] = useState("");
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [noEmail, setNoEmail] = useState(false);*/


  const isValid =
    name.trim().length > 0 &&
    gender &&
    business.trim().length > 0 &&
    location.trim().length > 0 &&
    pincode.length === 6 && /^[0-9]{6}$/.test(pincode);
    //pincode >= 100000 &&
    //pincode <= 999999 &&
    (email || noEmail) &&
    businessProofs.length >= 1;
  


  const { pickFiles } = useFileUpload();


  const handleUpload = async (source: "camera" | "gallery" | "files") => {
    const files = await pickFiles(source, uploadType!);

    if (files.length === 0) return;

    // PROFILE
    if (uploadType === "profile") {
      setProfileImage(files[0].uri);
      return;
    }

    // PROOF
    if (uploadType === "proof") {

      if (businessProofs.length >= 5) {
        Alert.alert("Limit reached", "Max 5 images");
        return;
      }

      const getId = (f: any) => `${f.name}_${f.size}`;
      const existing = businessProofs.map(getId);

      const unique = files.filter((f) => !existing.includes(getId(f)));

      if (unique.length !== files.length) {
        setDuplicateError("Some files already uploaded");
        setTimeout(() => setDuplicateError(""), 2000);
      }

      const merged = [...businessProofs, ...unique].slice(0, 5);
      setBusinessProofs(merged);
    }
  };




  return (
    <View style={{ flex: 1 }}>
     <FormScreenWrapper>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.background }}
          contentContainerStyle={{ padding: 20 }}
          keyboardShouldPersistTaps="handled"
        >
        {/* Profile */}
        {/* PROFILE IMAGE */}
        <ProfileImagePicker
          image={profileImage}
          theme={theme}
          onPick={() => {
            setUploadType("profile");
            setShowModal(true);
          }}
        />

        {/* NAME */}
        <Text style={[styles.label, { color: theme.text }]}>
          Full Name *
        </Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={(text) => setName(text)}
          style={[styles.input, {color: theme.text, borderColor: theme.border}]}
        />

        {errors.name && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {errors.name}
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
                onPress={() => setGender(g)}
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


        {/* BUSINESS */}
        <Text style={[styles.label, { color: theme.text }]}>
          Business Name *
        </Text>
        <TextInput
          placeholder="Enter business name"
          placeholderTextColor="#888"
          value={business}
          onChangeText={(text) => setBusiness(text)}
          style={[styles.input, {color: theme.text, borderColor: theme.border}]}
        />
        {errors.businessName && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {errors.businessName}
          </Text>
        )}

        {/* LOCATION */}
        <Text style={[styles.label, { color: theme.text }]}>
          Business Location *
        </Text>
        <TextInput
          placeholder="Enter location"
          placeholderTextColor="#888"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={[styles.input, {color: theme.text, borderColor: theme.border}]}
        />
        {errors.location && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {errors.location}
          </Text>
        )}

        <TextInput
          placeholder="Pincode"
          placeholderTextColor="#888"
          value={pincode ? pincode.toString() : ""}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, "").slice(0, 6);
            setPincode(numericText);
            setPincodeError(""); 
          }}
          keyboardType="numeric"
          maxLength={6}
          style={[styles.input, { marginTop: 10, color: theme.text, borderColor: theme.border }]}
        />

        {/* 👇 ADD THIS HERE (helper, not error) */}
        {pincode && pincode.toString().length < 6 && (
          <Text style={{ color: "#999", fontSize: 12, marginTop: 4 }}>
            Enter 6 digit pincode
          </Text>
        )}

          {errors.pincode && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {errors.pincode}
            </Text>
          )}

        {/* BUSINESS PROOF */}
        <Text style={[styles.label, { color: theme.text }]}>
          Proof of Business (Upload 1–5 images) *
        </Text>
        <Text style={styles.subText}>
          At least one image is mandatory to proceed
        </Text>

        <TouchableOpacity
          onPress={() => {
            setUploadType("proof");
            setShowModal(true);
          }}
          style={{
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ color: theme.text }}>
            {businessProofs.length > 0
              ? `+ Add more (${businessProofs.length}/5)`
              : "Upload Business Proof"}
          </Text>
          <FontAwesome name="upload" size={18} color={theme.primary} />
        </TouchableOpacity>

        {duplicateError ? (
          <Text
            style={{
              color: "red",
              fontSize: typography.sizes.xs,
              marginTop: 5,
            }}
          >
            {duplicateError}
          </Text>
        ) : null}

        {/* Show selected files */}
        {businessProofs.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 10,
          }}
        >
          {businessProofs.map((file, idx) => (
            <View
              key={file.uri}
              style={{
                width: 90,
                height: 90,
                marginRight: 10,
                marginBottom: 10,
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                borderWidth: 1,
                borderColor: theme.border,
              }}
            >
              {/* IMAGE */}
              <Image
                source={{ uri: file.uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />

              {/* REMOVE BUTTON */}
              <TouchableOpacity
                onPress={() => {
                  const updated = businessProofs.filter((_, i) => i !== idx);
                  setBusinessProofs(updated);
                }}
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  borderRadius: 12,
                  width: 22,
                  height: 22,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}



        {/* EMAIL */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.label, { color: theme.text }]}>
              Business Email
          </Text>
          <Text style={styles.note}>
              (Note: This will be verified by us)
          </Text>
          </View>

        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={(text) => {
            setEmail(text);

            if (text.length > 0 && noEmail) setNoEmail(false);
          }}
          style={[
            styles.input,
            {
              color: theme.text,
              borderColor: theme.border,
              opacity: noEmail ? 0.5 : 1,
            },
          ]}
          editable={!noEmail}
        />

        {errors.email && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {errors.email}
          </Text>
        )}

        {/* CHECKBOX */}
        <TouchableOpacity
          onPress={() => {
            // 🔥 If email already entered → block checkbox
            if (email.trim().length > 0) return;

            setNoEmail(!noEmail);

            // 🔥 If checking → clear email
            if (!noEmail) {
              setEmail("");
            }
          }}
          style={[
            styles.checkboxRow,
            {
              opacity: email.length > 0 ? 0.5 : 1, // 👈 visual feedback
            },
          ]}
          disabled={email.length > 0} // 🔥 hard disable
        >
          <View style={styles.checkbox}>
            {noEmail && <View style={styles.checked} />}
          </View>
          <Text style={{ color: theme.text }}>
            I don’t have business email
          </Text>
        </TouchableOpacity>

        {/* BUTTON */}
        <TouchableOpacity
          disabled={!isValid || submitting}
          style={[
            styles.saveButton,
            {
              backgroundColor: isValid
                ? theme.primary
                : theme.disable,
            },
          ]}
          onPress={async () => {
            if (submitting) return;

            const data = {
              name,
              businessName: business,
              location,
              pincode: pincode?.toString(),
              //email: noEmail ? "SKIPPED" : email,
              email: email,
            };

            const validationErrors = validateForm(
              data,
              EmployerSchema(noEmail)
            );

            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) {
              return;
            }

            try {

              setSubmitting(true);

              const payload = {
                full_name: name.trim(),
                profile_image_url: profileImage || null,
                gender: gender.toLowerCase(),
                business_name: business.trim(),
                business_location: location.trim(),
                latitude: 0,
                longitude: 0,
                pincode: pincode.toString(),
                business_email: noEmail ? null : email.trim().toLowerCase(),
                has_business_email: !noEmail,
                documents: businessProofs.map(f => f.uri) || [],
              };

              await saveEmployerProfile(payload);

              setFirstTimeFlow(true);

              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "MAIN_TABS",
                    params: { screen: "JOBS" },
                  },
                ],
              });

            } catch (error) {
              console.log("Employer profile error:", error);
              Alert.alert("Error", "Failed to save profile"); 
            } finally {
              setSubmitting(false); // ✅ ALWAYS RUNS
            }
          }}
        >
          <Text style={styles.saveText}>
            Create Profile
          </Text>
        </TouchableOpacity>


      </ScrollView>
    </FormScreenWrapper>
          



        {showRemoveModal && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          //onTouchStart={() => setShowRemoveModal(false)}
          //onTouchStart={() => {}}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: theme.background,
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
            }}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {/* ICON */}
            <FontAwesome name="trash" size={32} color="red" />

            {/* TITLE */}
            <Text
              style={{
                marginTop: 10,
                fontSize: 16,
                fontWeight: "600",
                color: theme.text,
              }}
            >
              Remove Photo?
            </Text>

            {/* SUBTEXT */}
            <Text
              style={{
                marginTop: 6,
                fontSize: 13,
                color: "#888",
                textAlign: "center",
              }}
            >
              Are you sure you want to remove your profile picture?
            </Text>

            {/* BUTTONS */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              {/* CANCEL */}
              <TouchableOpacity
                onPress={() => setShowRemoveModal(false)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: "#555",
                  marginRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Cancel</Text>
              </TouchableOpacity>

              {/* REMOVE */}
              <TouchableOpacity
                onPress={() => {
                  setProfileImage("");
                  setShowRemoveModal(false);
                }}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: "red",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}



      <UploadModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(source) => handleUpload(source)}
        theme={theme}
        title={
          uploadType === "profile"
            ? "Upload Profile Photo"
            : "Upload Business Proof"
        }
        allowFiles={uploadType === "proof"}
        allowRemove={uploadType === "profile" && !!profileImage}
        onRemove={() => {
          setShowRemoveModal(true);
      }}
      />
        </View>
    //</SafeAreaView>
  );
} 