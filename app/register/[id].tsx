import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct  } from "../../src/lib/api"; // see Step 3

export default function Register() {
  const { id } = useLocalSearchParams<{ id: string }>();   // ← barcode value

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),    // back-end or mock
    placeholderData: () => null,        // until API is ready
  });

  if (isLoading) return <Text>Loading…</Text>;
  if (error)     return <Text>Error: {`${error}`}</Text>;
  if (!data)     return <Text>No product found.</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>{data.name}</Text>
      <Text>Vendor: {data.vendor}</Text>
      <Text>Last SDS revision: {data.lastRevision}</Text>
      {/* add buttons: Download SDS, Add to Register, etc. */}
    </View>
  );
}
