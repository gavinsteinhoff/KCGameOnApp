import Button from "@/components/Button";
import CheckInData from "@/components/CheckInData";
import Scanner from "@/components/Scanner";
import { CheckInResult } from "@/types/CheckInResult";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanData, setScanData] = useState<CheckInResult | null>(null);

  const handleScan = useCallback(async (data: string) => {
    setIsScanning(false);
    setScanData({
      username: "test",
      ticketTypes: ["BYOC", "VIP"],
    });
  }, []);

  if (!isScanning) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {scanData !== null ? <CheckInData checkInResult={scanData} /> : null}
          <Button
            title="Scan Check In QR Code"
            onPress={() => {
              setIsScanning(true);
              setScanData(null);
            }}
          />
        </View>
      </View>
    );
  }

  if (isScanning) {
    return <Scanner onScan={handleScan} isScanning={isScanning} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 50,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
