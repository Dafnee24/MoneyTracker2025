import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeaderChat from '../../components/molecules/HeaderChat';
import Button from '../../components/atoms/Button';
import LogoInsight from '../../assets/Logo 2.svg';
import {BackButton} from '../../assets';
import {askGemini} from '../../services/gemini';
import MarkdownText from '../../components/molecules/MarkdownText';

const InsightScreenProject = ({navigation}) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [complaint, setComplaint] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAskDisabled = useMemo(
    () => !weight.trim() || !height.trim() || !age.trim() || !complaint.trim(),
    [weight, height, age, complaint],
  );

  const delay = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));

  const handleAskInsight = async () => {
    if (loading || isAskDisabled) {
      return;
    }
    setLoading(true);
    setError(null);
    setResponse('');

    const buildFallbackInsight = () => {
      const w = parseFloat(weight);
      const hMeters = parseFloat(height) / 100;
      const bmi =
        isFinite(w) && isFinite(hMeters) && hMeters > 0
          ? w / (hMeters * hMeters)
          : null;

      let bmiDesc = '';
      if (bmi) {
        if (bmi < 18.5) {
          bmiDesc = 'Berat badan kurang';
        } else if (bmi < 25) {
          bmiDesc = 'Berat badan ideal';
        } else if (bmi < 30) {
          bmiDesc = 'Kelebihan berat badan';
        } else {
          bmiDesc = 'Obesitas';
        }
      }

      return [
        '### Insight Kesehatan',
        bmi ? `- **BMI Perkiraan:** ${bmi.toFixed(1)} (${bmiDesc}).` : '',
        `- **Keluhan dicatat:** ${complaint}.`,
        '- Pastikan cukup istirahat, minum air putih, dan makan bergizi.',
        '- Jika keluhan tidak membaik atau semakin parah, konsultasikan ke tenaga medis profesional.',
      ]
        .filter(Boolean)
        .join('\n');
    };

    try {
      const prompt = [
        `Saya berusia ${age} tahun dengan berat ${weight} kg dan tinggi ${height} cm.`,
        `Keluhan utama: ${complaint}.`,
        'Tolong bantu jelaskan kemungkinan penyebab atau langkah awal yang bisa saya lakukan.',
        'Jawab dalam bahasa Indonesia yang ramah, beri saran singkat, dan ingatkan bahwa ini bukan diagnosis dokter.',
      ].join(' ');

      const aiResponse = await askGemini(prompt);
      const finalText =
        aiResponse && aiResponse !== '(Kosong)'
          ? aiResponse
          : buildFallbackInsight();

      const words = finalText.split(/(\s+)/);
      let acc = '';
      for (let i = 0; i < words.length; i += 3) {
        acc += words.slice(i, i + 3).join('');
        setResponse(acc);
        await delay(25);
      }
    } catch (err) {
      setResponse('');
      setError(
        `Maaf, gagal mengambil insight.\n${
          err?.message || 'Terjadi kesalahan'
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderChat
        onPressMenu={() => navigation.goBack()}
        leftSlot={<BackButton width={24} height={24} />}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoWrapper}>
          <LogoInsight width={120} height={120} />
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Berat badan</Text>
            <TextInput
              style={styles.metricInput}
              placeholder="bb"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Tinggi badan</Text>
            <TextInput
              style={styles.metricInput}
              placeholder="tb"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Usia</Text>
            <TextInput
              style={styles.metricInput}
              placeholder="usia"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>
        </View>

        <Text style={styles.promptLabel}>Apa keluhan / Kondisi fisik</Text>
        <TextInput
          style={styles.textArea}
          multiline
          textAlignVertical="top"
          placeholder="Ceritakan keluhan atau kondisi fisikmu..."
          placeholderTextColor="#8A8A8A"
          value={complaint}
          onChangeText={setComplaint}
        />

        <View style={styles.buttonWrapper}>
          <Button
            label={loading ? 'Mengirim...' : 'Tanya AI Insight'}
            onPress={handleAskInsight}
            color={isAskDisabled || loading ? '#A9E2B4' : undefined}
            textColor="#FFFFFF"
          />
        </View>

        <View style={styles.responseBox}>
          <ScrollView
            style={styles.responseScroll}
            contentContainerStyle={styles.responseContent}
            showsVerticalScrollIndicator={false}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : response ? (
              <MarkdownText textStyle={styles.responseText}>
                {response}
              </MarkdownText>
            ) : (
              <Text style={styles.placeholderText}>
                Jawaban AI Insight akan muncul di sini.
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightScreenProject;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  metricLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#1E1E1E',
    marginBottom: 10,
  },
  metricInput: {
    width: 90,
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1E1E1E',
    paddingVertical: 6,
  },
  promptLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#7B7B7B',
    marginBottom: 10,
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    minHeight: 120,
    padding: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1E1E1E',
  },
  buttonWrapper: {
    marginTop: 24,
    marginBottom: 20,
  },
  responseBox: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    height: 180,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  responseScroll: {
    flex: 1,
  },
  responseContent: {
    padding: 16,
  },
  responseText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#1E1E1E',
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9A9A9A',
  },
  errorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#D9534F',
  },
});
