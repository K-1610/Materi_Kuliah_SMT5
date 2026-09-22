import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  Flatlist,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaViewBase,
  StyleSheet,
  Platform,
}
  from 'react-native';

const PROFILE = {
  name: 'Kamalul Iman',
  title: 'Mahasiswa',
  email: 'kamalul1610@uinssc.ac.id',
  phone: '089699422279',
  location: 'Cirebon, West Java',
  bio: 'Mahasiswa Semester 5 UINSSC',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJgyWNUqdlO5e0OYvG0yBecPZZclxG4rQBamuPeq3D5uWLFiJo6=w124-h124-k-no-v0-cc-rp',
  avatarOffline: 'assets/foto.png',
};

const SKILL = [
  { id: '1', name: 'React Native', level: 90, color: '#61dafb' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569b' },
  { id: '3', name: 'JavaScript', level: 88, color: '#f7df1e' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178c6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 82, color: '#ffca28' },
]

const SECTION = [
  {
    title: 'Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Senior Mobile Developer',
        company: 'PT. TechVision Indonesia',
        period: '2029 - Sekarang',
        desc: 'Memimpin tim 5 developer dalam pengembangan aplikasi e-commerce mobile',
      },
      {
        id: 'e2',
        role: 'Mobile Developer',
        company: 'Starup Fintech - PayEasy',
        period: '2020 - 2022',
        desc: 'Mengembangkan fitur pembayaran digital menggunakan React Native & Redux.',
      },
    ],
  },
  {
    title: 'Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - 2029',
        desc: 'IPK 3.72 / 4,00'
      },
    ],
  },
];

const SOCIAL = [
  { id: 's1', label: 'Github', icon: '🎖️', url: '' },
  { id: 's2', label: 'LinkedIn', icon: '💼', url: '' },
  { id: 's3', label: 'Youtube', icon: '📹', url: '' },
]



export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>Nama Lengkap: Kamalul Iman</Text>
      <Text style={{ textAlign: "center" }}>Tempat Tanggal Lahir: Cirebon 16-Oktober-2006</Text>
      <Text style={{ textAlign: "center" }}>Cita-Cita: Mengembangkan Virtual Reality dan membuat perusahaan berbasis Virtual Reality</Text>
      <Text style={{ textAlign: "center" }}>Rencana Hidup: Membaca dan mencari tahu semua tentang Virtual Reality</Text>
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
