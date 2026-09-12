import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{textAlign:"center"}}>Nama Lengkap: Kamalul Iman</Text>
      <Text style={{textAlign:"center"}}>Tempat Tanggal Lahir: Cirebon 16-Oktober-2006</Text>
      <Text style={{textAlign:"center"}}>Cita-Cita: Mengembangkan Virtual Reality dan membuat perusahaan berbasis Virtual Reality</Text>
      <Text style={{textAlign:"center"}}>Rencana Hidup: Membaca dan mencari tahu semua tentang Virtual Reality</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
