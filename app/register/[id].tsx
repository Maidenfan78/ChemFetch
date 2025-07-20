// filepath: app/(main)/register/[id].tsx
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchProduct } from "../../src/lib/api";

export default function RegisterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  useEffect(() => {
    if (data === null) {
      const t = setInterval(() => refetch(), 2000);
      return () => clearInterval(t);
    }
  }, [data, refetch]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Looking up product…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{`${error}`}</Text>
      </View>
    );
  }

  if (data === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Fetching SDS…</Text>
      </View>
    );
  }

  if (!data) return null;

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.label}>GTIN: {data.gtin}</Text>
      {data.vendor && <Text style={styles.label}>Vendor: {data.vendor}</Text>}
      {data.lastRevision && (
        <Text style={styles.label}>
          Last SDS revision: {data.lastRevision}
        </Text>
      )}

      {data.sdsUrl && (
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(data.sdsUrl!)}
        >
          <Text style={styles.buttonText}>Open SDS PDF</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  label: { fontSize: 16, marginBottom: 4 },
  button: {
    marginTop: 20,
    backgroundColor: "#007aff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
});
