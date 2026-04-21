import React from "react";
import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalSafeArea from "./src/components/GlobalSafeArea";
import * as SystemUI from "expo-system-ui";
import { useTheme } from "./src/hooks/useTheme";
import 'react-native-get-random-values';

export default function App() {

    const theme = useTheme();

  useEffect(() => {
    // Set system navigation bar color to match theme
    SystemUI.setBackgroundColorAsync(theme.background);
  }, [theme]);

  return (
    <SafeAreaProvider>
      <GlobalSafeArea>
        <AppNavigator />
      </GlobalSafeArea>
    </SafeAreaProvider>
  );
}


{/*
  import React from "react";
import { View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import globalStyles from "./src/styles/global.styles";

function AppContent() {
  const insets = useSafeAreaInsets();
  const styles = globalStyles(insets);

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
*/}