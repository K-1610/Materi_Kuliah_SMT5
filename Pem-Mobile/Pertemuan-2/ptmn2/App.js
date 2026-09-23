import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  SafeAreaViewBase,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';

const PROFILE = {
  name: 'Kamalul Iman',
  title: 'Mahasiswa',
  email: 'kamalul1610@uinssc.ac.id',
  phone: '089699422279',
  location: 'Cirebon, West Java',
  bio: 'Mahasiswa Informatika Semester 5 UINSSC',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJgyWNUqdlO5e0OYvG0yBecPZZclxG4rQBamuPeq3D5uWLFiJo6=w124-h124-k-no-v0-cc-rp',
  avatarOffline: 'assets/foto.png',
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61dafb' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569b' },
  { id: '3', name: 'JavaScript', level: 88, color: '#f7df1e' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178c6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 82, color: '#ffca28' },
]

const SECTIONS = [
  {
    title: 'Pengalaman Organisasi',
    data: [
      {
        id: 'e1',
        role: 'Anggota',
        company: 'Himpunan Mahasiswa Informatika - UIN Siber Syeikh Nurjati Cirebon',
        period: '2025 - 2026',
        desc: 'membuat desain dan dokumentasi setiap kegiatan himpunan',
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
        period: '2024 - sekarang',
        desc: 'IPK 3.62 / 4,00'
      },
    ],
  },
];

const SOCIAL = [
  { id: 's1', label: 'Github', icon: '💻', url: 'https://github.com/K-1610' },
  { id: 's2', label: 'Instagram', icon: '📷', url: 'https://www.instagram.com/key_sixteen_?stkn=eHU0Z215ajhrd2F6' },
  { id: 's3', label: 'Tiktok', icon: '🎵', url: 'https://www.tiktok.com/@mskuyyy_16?_r=1&_t=ZS-99xdsOEUtYD' },
]

const SkillCard = ({ item }) => {
  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{item.name}</Text>
        <Text style={styles.skillPercent}>{item.level}%</Text>
      </View>

      <View style={styles.progressBg}>
        <View
          style={{
            ...styles.progressFill,
            width: `${item.level}%`,
            backgroundColor: item.color,
          }}
        />
      </View>
    </View>
  );
};

const TimelineCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.timelineCard} onPress={() => onPress(item)} activeOpacity={0.75}>
      <View style={styles.timelineDot} />

      <View style={styles.timelineContent}>
        <Text style={styles.timelineRole}>{item.role}</Text>
        <Text style={styles.timelineCompany}>{item.company}</Text>
        <Text style={styles.timelinePeriod}>{item.period}</Text>
        <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function App() {
  const [openToWork, setOpenToWork] = useState(true);
  const avatarScale = useRef(new Animated.Value(0.5)).current;
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Info');

  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactModalTitle, setContactModalTitle] = useState('');
  const [contactModalMessage, setContactModalMessage] = useState('');
  const [contactModalType, setContactModalType] = useState('info');

  useEffect(() => {
    Animated.spring(avatarScale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const showContactModal = (title, message, type = 'info') => {
    setContactModalTitle(title);
    setContactModalMessage(message);
    setContactModalType(type);
    setContactModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      showContactModal('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!', 'warning');
      return;
    }

    setSending(true);

    setTimeout(() => {
      const namaPengirim = senderName;

      setSending(false);
      setSenderName('');
      setMessage('');

      showContactModal('✅ Berhasil', `Pesan dari ${namaPengirim} telah terkirim!`, 'success');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />
      {/* HEADER BAR */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>💼 Curriculum Vitae</Text>
        </View>
        {/* Toggle "Open to Work" */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{openToWork ? '🟢 Open' : '🔴 Busy'}</Text>
          <Switch value={openToWork} onValueChange={setOpenToWork} trackColor={{ false: '#555', true: '#4ade80' }} thumbColor={openToWork ? '#fff' : '#aaa'} />
        </View>
      </View>

      <View style={styles.tabContainer}>
        {['Info', 'Skills', 'Kontak'].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]} onPress={() => setActiveTab(tab)} activeOpacity={0.8}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ========================================
          SECTION PROFIL
          Konsep: View, Text, Image
          ======================================== */}
        {activeTab === 'Info' && (
          <View style={styles.profileSection}>
            {/* 1. Image → foto profil dari URL internet */}
            <Animated.Image
              source={{ uri: PROFILE.avatar }}
              style={[
                styles.avatar,
                {
                  transform: [{ scale: avatarScale }],
                },
              ]}
              resizeMode="cover"
            />
            {openToWork && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🟢 Open to Work</Text>
              </View>
            )}

            {/* 2. Text → berbasis ukuran & weight */}
            <Text style={styles.profileName}>{PROFILE.name}</Text>
            <Text style={styles.profileTitle}>{PROFILE.title}</Text>
            <Text style={styles.profileBio}>{PROFILE.bio}</Text>
            {/* Info kontak dalam baris horizontal */}
            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
              <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
              <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>
            </View>
            {/* 3. TouchableOpacity → tombol sosial media */}
            <View style={styles.socialRow}>
              {SOCIAL.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={styles.socialButton}
                  onPress={async () => {
                    // Coba buka link ke browser/aplikasi
                    try {
                      await Linking.openURL(s.url);
                    } catch (error) {
                      showContactModal('Gagal', 'Tidak dapat membuka link ini', 'warning');
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.socialIcon}>{s.icon}</Text>
                  <Text style={styles.socialLabel}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* 10. Pressable → tombol dengan efek saat ditekan */}
            <Pressable
              style={({ pressed }) => [styles.downloadBtn, pressed && styles.downloadBtnPressed]}
              onPress={() => {
                setPressing(true);

                setTimeout(() => {
                  setPressing(false);
                  setDownloadModalVisible(true);
                }, 1000);
              }}
            >
              <Text style={styles.downloadBtnText}>{pressing ? '⏳ Mengunduh...' : '📄 Download CV (PDF)'}</Text>
            </Pressable>
          </View>
        )}

        {/* ════════════════════════════════════
      SECTION SKILLS
      Komponen: FlatList
      ════════════════════════════════════ */}
        {activeTab === 'Skills' && (
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
            <Text style={styles.sectionSubtitle}>→ FlatList: menampilkan list data secara efisien</Text>

            {/* 5. FlatList → daftar skill */}
            <FlatList data={SKILLS} keyExtractor={(item) => item.id} renderItem={({ item }) => <SkillCard item={item} />} scrollEnabled={false} ItemSeparatorComponent={() => <View style={{ height: 8 }} />} />
          </View>
        )}

        {activeTab === 'Info' && (
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>📋 Riwayat</Text>
            <Text style={styles.sectionSubtitle}>→ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.</Text>

            {/* 6. SectionList → pengalaman & pendidikan */}
            <SectionList
              sections={SECTIONS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                // TimelineCard punya onPress untuk membuka Modal
                <TimelineCard item={item} onPress={handleCardPress} />
              )}
              // renderSectionHeader: header untuk tiap kelompok
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
              )}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
          </View>
        )}

        {activeTab === 'Kontak' && (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>📩 Hubungi Saya</Text>
              <Text style={styles.sectionSubtitle}>→ TextInput, Button, ActivityIndicator</Text>
              {/* 7. TextInput → input nama */}
              <TextInput style={styles.textInput} placeholder="Nama Anda" placeholderTextColor="#888" value={senderName} onChangeText={setSenderName} returnKeyType="next" editable={!sending} />
              {/* 7. TextInput → input pesan */}
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />
              {sending ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="large" color="#7c3aed" />
                  <Text style={styles.loadingText}>Mengirim pesan...</Text>
                </View>
              ) : (
                <Button title="Kirim Pesan" color="#7c3aed" onPress={handleSend} />
              )}
            </View>
          </KeyboardAvoidingView>
        )}

        {activeTab === 'Info' && (
          <View style={styles.componentSection}>
            <Text style={styles.componentTitle}>📚 Core Components yang Digunakan</Text>

            <Text style={styles.componentItem}>1. View — Membuat container dan mengatur layout.</Text>

            <Text style={styles.componentItem}>2. Text — Menampilkan teks dan informasi pada aplikasi.</Text>

            <Text style={styles.componentItem}>3. Image — Menampilkan foto profil dari URL internet.</Text>

            <Text style={styles.componentItem}>4. Animated — Memberikan animasi pada foto profil.</Text>

            <Text style={styles.componentItem}>5. ScrollView — Memungkinkan pengguna menggulir halaman CV.</Text>

            <Text style={styles.componentItem}>6. FlatList — Menampilkan daftar skills secara efisien.</Text>

            <Text style={styles.componentItem}>7. SectionList — Menampilkan data berdasarkan kelompok atau kategori.</Text>

            <Text style={styles.componentItem}>8. TextInput — Menyediakan kolom untuk memasukkan nama dan pesan.</Text>

            <Text style={styles.componentItem}>9. Button — Menjalankan aksi untuk mengirim pesan.</Text>

            <Text style={styles.componentItem}>10. TouchableOpacity — Membuat tombol interaktif seperti tombol sosial media.</Text>

            <Text style={styles.componentItem}>11. Pressable — Membuat tombol Download CV dengan efek saat ditekan.</Text>

            <Text style={styles.componentItem}>12. Switch — Mengubah status Open to Work dan Busy.</Text>

            <Text style={styles.componentItem}>13. Modal — Menampilkan informasi dalam popup.</Text>

            <Text style={styles.componentItem}>14. ActivityIndicator — Menampilkan indikator loading saat mengirim pesan.</Text>

            <Text style={styles.componentItem}>15. StatusBar — Mengatur tampilan status bar perangkat.</Text>

            <Text style={styles.componentItem}>16. SafeAreaView — Menjaga konten agar tidak tertutup area sistem.</Text>

            <Text style={styles.componentItem}>17. KeyboardAvoidingView — Menyesuaikan tampilan ketika keyboard muncul.</Text>

            <Text style={styles.componentItem}>18. StyleSheet — Mengatur seluruh styling komponen aplikasi.</Text>
          </View>
        )}

        <View style={{ height: 40 }} />

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        {/* Overlay gelap di belakang dialog */}
        <View style={styles.modalOverlay}>
          {/* Kotak dialog */}
          <View style={styles.modalBox}>
            {/* Render isi hanya jika ada item yang dipilih */}
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}

            {/* Tombol tutup modal */}
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={downloadModalVisible} transparent animationType="fade" onRequestClose={() => setDownloadModalVisible(false)}>
        <View style={styles.downloadModalOverlay}>
          <View style={styles.downloadModalBox}>
            <Text style={styles.downloadModalTitle}>📄 Download</Text>

            <Text style={styles.downloadModalText}>CV sedang disiapkan...</Text>

            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setDownloadModalVisible(false)}>
              <Text style={styles.modalCloseBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={contactModalVisible} transparent animationType="fade" onRequestClose={() => setContactModalVisible(false)}>
        <View style={styles.contactModalOverlay}>
          <View style={styles.contactModalBox}>
            <Text style={[styles.contactModalTitle, contactModalType === 'warning' ? styles.warningTitle : styles.successTitle]}>{contactModalTitle}</Text>

            <Text style={styles.contactModalText}>{contactModalMessage}</Text>

            <TouchableOpacity style={styles.contactModalButton} onPress={() => setContactModalVisible(false)} activeOpacity={0.8}>
              <Text style={styles.contactModalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const COLORS = {
  bg: '#0f0f1a',
  gepad: '#1a1a2e',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};


const styles = StyleSheet.create({
  // ── LAYOUT DASAR ────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },

  // ── HEADER BAR ────────────────────────────
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // ── SECTION PROFIL ─────────────────────────
  profileSection: {
    alignItems: 'center', // rata tengah horizontal
    paddingVertical: 32,
    paddingHorizontal: 28,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24, // sudut kiri bawah melengkung
    borderBottomRightRadius: 24,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55, // lingkaran (width/2)
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20, // tinggi tiap baris teks
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row', // bungkus ke baris baru jika tidak muat
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  // ── SOSIAL MEDIA ───────────────────────────
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },

  // ── PRESSABLE DOWNLOAD ─────────────────────
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50, // pill shape
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6', // lebih gelap saat ditekan
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // ── SECTION BOX (wrapper kartu) ────────────
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },

  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 13,
  },
  skillPercent: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
    // width & backgroundColor diset secara inline (dinamis dari data)
  },

  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },
  timelineCompany: {
    color: COLORS.accentLight,
    fontSize: 13,
    marginBottom: 2,
  },
  timelinePeriod: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 6,
  },
  timelineHint: {
    color: COLORS.accentGold,
    fontSize: 11,
    fontStyle: 'italic',
  },

  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    // Platform.OS membedakan iOS dan Android
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },

  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderTopColor: COLORS.accent,
  },

  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },

  modalCompany: {
    color: COLORS.accentLight,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },

  modalPeriod: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 16,
  },

  modalDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginBottom: 16,
  },

  modalDesc: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },

  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  modalCloseBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },

  tabButtonActive: {
    backgroundColor: COLORS.accent,
  },

  tabText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },

  tabTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },

  downloadModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  downloadModalBox: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#1e1b4b',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },

  downloadModalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  downloadModalText: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 24,
  },

  // ── CONTACT MESSAGE MODAL ─────────────────

  contactModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  contactModalBox: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#1e1b4b',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },

  contactModalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  warningTitle: {
    color: '#fbbf24',
  },

  successTitle: {
    color: '#4ade80',
  },

  contactModalText: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },

  contactModalButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  contactModalButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  componentSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  componentTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 14,
  },

  componentItem: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 22,
  },
});
