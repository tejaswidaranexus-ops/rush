import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../../hooks/useTheme";
import { useEmployerStore } from "../../store/employerStore";
import { getEmployerProfile } from "../../services/employerService";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmModal from "../../components/ConfirmModal";

type Nav = NativeStackNavigationProp<RootStackParamList>;


export default function EmployerProfileViewScreen() {
  const theme = useTheme();
  //const navigation = useNavigation<any>(); - optional 
  const navigation = useNavigation<Nav>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    profileImage,
    name,
    gender,
    business,
    location,
    pincode,
    email,
    phone,
    noEmail,
    businessProofs,
    setProfileFromBackend,
  } = useEmployerStore();

  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
        const data = await getEmployerProfile();
        console.log("PROFILE DATA:", data);
        if (data) {
        setProfileFromBackend(data);
        }
    } catch (e) {
        console.log("View profile error:", e);
    } finally {
        setLoading(false);
    }
    };

  useFocusEffect(
    useCallback(() => {
        setLoading(true); // important reset
        loadProfile();
    }, [])
    );

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading profile...</Text>
        </View>
    );
    }



    const handleDelete = async () => {
    try {
        setShowDeleteModal(false);

        // 🔥 TODO: backend delete later
        // await deleteEmployerProfile();

        // 🔥 clear store
        useEmployerStore.getState().clearProfile?.();

        // 🔥 remove token (logout)
        await AsyncStorage.removeItem("token");

        // 🔥 go to ROLE screen (fresh start)
        navigation.reset({
        index: 0,
        routes: [{ name: "ROLE" }],
        });

    } catch (e) {
        Alert.alert("Error", "Failed to delete account");
    }
    };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* PROFILE IMAGE */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
            }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No Image</Text>
          </View>
        )}
      </View>

      {/* ACTION BUTTONS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("EMPLOYER_PROFILE_EDIT")}
          style={{
            flex: 1,
            marginRight: 10,
            backgroundColor: theme.primary,
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: "red",
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
            }}
            >
            <Text style={{ color: "#fff" }}>Delete</Text>
            </TouchableOpacity>
      </View>

      {/* DETAILS */}
      <View style={{ gap: 10 }}>
        <Text style={{ color: theme.text }}>Name: {name}</Text>
        <Text style={{ color: theme.text }}>Gender: {gender}</Text>
        <Text style={{ color: theme.text }}>Business: {business}</Text>
        <Text style={{ color: theme.text }}>Location: {location}</Text>
        <Text style={{ color: theme.text }}>Pincode: {pincode}</Text>

        <Text style={{ color: theme.text }}>
          Email: {noEmail ? "Not provided" : email}
        </Text>

        <Text style={{ color: theme.text }}>
            Phone: {phone} 🔒
        </Text>
      </View>
        <Text style={{ color: theme.text, fontSize: 12, opacity: 0.6 }}>
            (Phone number cannot be changed)
        </Text>


      {/* DOCUMENTS */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: theme.text, marginBottom: 10 }}>
          Business Proofs
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {businessProofs.map((doc, index) => (
            <Image
              key={index}
              source={{ uri: doc.uri }}
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
                marginBottom: 10,
                borderRadius: 10,
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>

    <ConfirmModal
        visible={showDeleteModal}
        theme={theme}
        message="Are you sure you want to delete your account from RUSH? This action cannot be undone."
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        />
    </View>
  );
}