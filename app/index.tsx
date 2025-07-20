// app/index.tsx
import { View, Text, Pressable } from "react-native";
import { router, Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 24 }}>Chemfetch Mobile α</Text>

      {/* Navigate with router */}
      <Pressable
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          backgroundColor: "#007aff",
          borderRadius: 6,
        }}
        onPress={() => router.push("/scan")}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Scan a Barcode</Text>
      </Pressable>

      {/* —or— use a Link component */}
      {/* <Link href="/scan">Scan a Barcode</Link> */}
    </View>
  );
}
