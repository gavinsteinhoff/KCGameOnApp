import { CheckInResult } from "@/types/CheckInResult";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  checkInResult: CheckInResult;
};

export default function CheckInData({ checkInResult }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Username:</Text>
      <Text style={styles.subTitle}>{checkInResult.username}</Text>
      <Text style={styles.title}>TicketTypes:</Text>
      {checkInResult.ticketTypes.map((ticketType, index) => (
        <Text key={index} style={styles.subTitle}>
          {ticketType}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "#474f58",
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  subTitle: {
    color: "#fff",
    fontSize: 24,
  },
});
