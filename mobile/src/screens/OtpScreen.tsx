import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import { useAuthStore } from "../store/authStore";

import { verifyOtp } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertModal from "../components/AlertModal";


export default function OtpScreen({ route, navigation }: any) {
  const theme = useTheme();
  const setAuth = useAuthStore((s) => s.setAuth);

  const { phone } = route.params;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const isValid = otp.every((d) => d !== "");

  // Create refs for each input
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if value entered
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      // Move focus to previous input if backspace pressed on empty box
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: typography.sizes.xxxl,
          fontWeight: typography.weights.bold,
          textAlign: "center",
          margin: 5,
        }}
      >
        Enter OTP
      </Text>

      <Text style={{ color: "#888", marginTop: 10, textAlign: "center" }}>
        Enter the OTP code we just sent you on
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 5,
        }}
      >
        <Text style={{ color: "#888", fontSize: typography.sizes.md }}>+91 {phone}</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: theme.primary,
              marginLeft: 8,
              textDecorationLine: "underline",
            }}
          >
            Change number
          </Text>
        </TouchableOpacity>
      </View>

      {/* OTP Boxes */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {otp.map((d, i) => (
          <TextInput
            key={i}
            ref={(ref) => {
              inputs.current[i] = ref;
            }}
            maxLength={1}
            keyboardType="numeric"
            value={d}
            onChangeText={(v) => handleChange(v, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: "#444",
              marginRight: 10,
              textAlign: "center",
              color: theme.text,
              borderRadius: 10,
            }}
          />
        ))}
      </View>

      {/* Resend */}
      <Text
        style={{
          color: theme.primary,
          marginTop: 10,
          textAlign: "right",
          textDecorationLine: "underline",
        }}
      >
        Resend OTP
      </Text>

      {/* Proceed */}
      <TouchableOpacity
        disabled={!isValid}
        onPress={async () => {
          try {
            const code = otp.join("");

            console.log("Verifying OTP:", code);

            const res = await verifyOtp(`91${phone}`, code);

            console.log("Response:", res);

            await setAuth(res.token);  // STORE TOKEN USING ZUSTAND

            console.log("Token saved");

            navigation.replace("ROLE");

          } catch (error: any) {
              console.log("Verify OTP error:", error);

              const message =
                error?.response?.data?.error || "Something went wrong";

              setAlertMessage(message);
              setAlertVisible(true);

              setOtp(["", "", "", "", "", ""]);

              setTimeout(() => {
                inputs.current[0]?.focus();
              }, 100);
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
        <Text style={{ color: "#fff" }}>Proceed</Text>
      </TouchableOpacity>

      <AlertModal
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        theme={theme}
      />
    </View>
  );
}
