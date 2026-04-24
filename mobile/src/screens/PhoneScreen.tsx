import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import { useAuthStore } from "../store/authStore";

import { sendOtp } from "../services/authService";

export default function PhoneScreen({ navigation }: any) {
  const theme = useTheme();
  const [phone, setPhone] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const isValid = phone.length === 10 && isAccepted && !phoneError;

  const validatePhone = (text: string) => {
  const numericText = text.replace(/[^0-9]/g, "").slice(0, 10);
    if (numericText.length === 0) {
    setPhoneError("");
      } else if (numericText.length < 10) {
        setPhoneError("Enter 10-digit phone number");
      } else {
        setPhoneError("");
      }

      setPhone(numericText); 
  };

  

  useEffect(() => {
    // Run once on mount
    const params = navigation?.getState()?.routes?.slice(-1)[0]?.params;
    if (params?.accepted) setIsAccepted(true);
    if (params?.phone) setPhone(params.phone);

    // Subscribe to focus events
    const unsubscribe = navigation.addListener("focus", () => {
      const focusParams = navigation?.getState()?.routes?.slice(-1)[0]?.params;
      if (focusParams?.accepted) setIsAccepted(true);
      if (focusParams?.phone) setPhone(focusParams.phone);
    });

    return unsubscribe;
  }, [navigation]);



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: theme.text, fontSize: typography.sizes.xxxl, fontWeight: typography.weights.bold, textAlign: "center", margin: 5 }}>
        Verify your Phone Number
      </Text>

      <Text style={{ color: "#888", marginTop: 10, textAlign: "center", margin: 5 }}>
        Don't worry! No one can access it without your permission.
        It's 100% safe and secure
      </Text>

      {/* Input Row */}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View
          style={{
            padding: 12,
            backgroundColor: "#333",
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>+91</Text>
        </View>

        <TextInput
          placeholder="Enter phone number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={validatePhone}   // ✅ now using the helper function
          maxLength={10}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: phoneError ? "red" : "#444",
            borderRadius: 10,
            padding: 12,
            color: theme.text,
          }}
        />


      </View>

      {phoneError ? (
        <Text style={{ color: "#888", marginTop: 5 }}>
          {phoneError}
        </Text>
      ) : null}


      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
      
      {/* CHECKBOX */}
      <TouchableOpacity
        onPress={() => setIsAccepted(!isAccepted)}
        style={{
          width: 22,
          height: 22,
          borderWidth: 2,
          borderColor: theme.primary,
          marginRight: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isAccepted && (
          <Text style={{ color: theme.primary, fontWeight: "bold" }}>
            ✓
          </Text>
        )}
      </TouchableOpacity>

      {/* TEXT */}
      <Text style={{ color: theme.text }}>
        I agree to{" "}
        <Text
          style={{ color: theme.primary, textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("TERMS", { phone })}
        >
          Terms & Conditions
        </Text>
      </Text>
    </View>


      {/* Button */}
      <TouchableOpacity
        disabled={!isValid}
        onPress={async () => {
          try {
            //await sendOtp({
            //  phone: `91${phone}`,
            //  termsAccepted: isAccepted});
            const res = await sendOtp({
              phone: `91${phone}`,
              termsAccepted: isAccepted
            });

            console.log("OTP from backend:", res.otp); // debug

            alert(`Your OTP is ${res.otp}`); // 👈 SHOW OTP

            navigation.navigate("OTP", { phone });
          } catch (error) {
            console.log("Send OTP error:", error);
          }
        }}
        style={{
          backgroundColor: isValid ? theme.primary : "#555",
          padding: 15,
          borderRadius: 10,
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}