import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GlobalSafeArea({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["left", "right", "bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}
