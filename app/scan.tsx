import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Vibration } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import * as Haptics from "expo-haptics";
import { router, useFocusEffect } from "expo-router";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  /* Reset each time this screen regains focus */
  useFocusEffect(() => setScanned(false));

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 16 }}>
          We need your permission to use the camera
        </Text>
        <Pressable onPress={requestPermission}>
          <Text style={{ color: "blue" }}>Grant permission</Text>
        </Pressable>
      </View>
    );

  function handleScan({ data }: BarcodeScanningResult) {
    if (scanned) return;          // debounce
    setScanned(true);

    // ✅ tactile feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => Vibration.vibrate(50)
    );

    // Navigate to register screen
    router.push(`/register/${data}`);
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_e", "qr"],
        }}
      />

      {/* Aiming rectangle + cross-hair */}
      <View pointerEvents="none" style={styles.reticle}>
        <View style={styles.crossVertical} />
        <View style={styles.crossHorizontal} />
      </View>

      {/* Overlay text */}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          {scanned ? "✓  Scanned" : "Align barcode inside the box"}
        </Text>
      </View>
    </View>
  );
}

const RETICLE_SIZE = 220;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reticle: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: RETICLE_SIZE,
    height: RETICLE_SIZE,
    marginLeft: -RETICLE_SIZE / 2,
    marginTop: -RETICLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "#00FF7F",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  crossVertical: {
    position: "absolute",
    width: 2,
    height: "60%",
    backgroundColor: "#00FF7F",
  },
  crossHorizontal: {
    position: "absolute",
    height: 2,
    width: "60%",
    backgroundColor: "#00FF7F",
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
