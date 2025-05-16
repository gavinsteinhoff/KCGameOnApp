import Button from "@/components/Button";
import CheckInData from "@/components/CheckInData";
import Scanner from "@/components/Scanner";
import { CheckInResult } from "@/types/CheckInResult";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeId, setBarcodeId] = useState<string | null>(null);
  const [scanData, setScanData] = useState<CheckInResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!barcodeId) {
      return;
    }

    if (barcodeId === "__CANCEL__") {
      setBarcodeId(null);
      setScanData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      setScanData(null);
      try {
        console.log("Fetching data for barcode:", barcodeId);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setScanData({
          username: "test-user",
          ticketTypes: ["BYOC", "VIP", "Rental"],
        } as CheckInResult);

        // const API_URL = "http://10.0.2.2:65385/Events/Checkin.aspx/ApiCheckIn";
        // const response = await fetch(API_URL, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ barcode: barcodeId }),
        // });

        // if (!response.ok) {
        //   const errorText = await response.text();
        //   console.error("Error fetching data:", response.statusText, errorText);
        //   setError(`API Error: ${response.status} ${response.statusText}`);
        //   setIsLoading(false);
        //   return;
        // }

        // const result = await response.json();
        // if (result.error) {
        //   console.error("Error in response:", result.error);
        //   return;
        // }

        // setScanData(result.d as CheckInResult);
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [barcodeId]);

  const handleScan = useCallback(async (data: string) => {
    data = "1084908353049100";
    setIsScanning(false);
    setBarcodeId(data);
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    setBarcodeId(null);
    setScanData(null);
    setError(null);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={(styles.content, { justifyContent: "center" })}>
          <ActivityIndicator size="large" color="#3EB1DC" />
        </View>
      </View>
    );
  }

  if (!isScanning) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {scanData !== null ? <CheckInData checkInResult={scanData} /> : null}
          <Button
            title="Scan Check In QR Code"
            onPress={() => {
              startScanning();
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
    justifyContent: "center",
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
