import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      // AuthProvider will auto-redirect to (tabs)
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="items-center mb-10">
          <View className="bg-green-500/10 rounded-full w-20 h-20 items-center justify-center mb-4">
            <Text className="text-4xl">✨</Text>
          </View>
          <Text className="text-3xl font-extrabold text-white">Criar conta</Text>
          <Text className="text-slate-400 mt-2 text-base">Comece sua jornada tech</Text>
        </View>

        {/* Form */}
        <View className="w-full">
          {error ? (
            <View className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
              <Text className="text-red-400 text-center text-sm">{error}</Text>
            </View>
          ) : null}

          <TextInput
            className="bg-slate-800 text-white px-4 py-4 rounded-2xl border border-slate-700 text-base"
            placeholder="Seu nome"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />

          <TextInput
            className="bg-slate-800 text-white px-4 py-4 rounded-2xl border border-slate-700 mt-4 text-base"
            placeholder="Seu email"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <TextInput
            className="bg-slate-800 text-white px-4 py-4 rounded-2xl border border-slate-700 mt-4 text-base"
            placeholder="Sua senha"
            placeholderTextColor="#64748b"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TextInput
            className="bg-slate-800 text-white px-4 py-4 rounded-2xl border border-slate-700 mt-4 text-base"
            placeholder="Confirmar senha"
            placeholderTextColor="#64748b"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            className={`py-4 rounded-2xl mt-8 ${loading ? 'bg-green-700' : 'bg-green-500'}`}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center font-bold text-lg">Criar conta</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6"
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text className="text-center text-slate-400">
              Já tem conta?{' '}
              <Text className="text-green-400 font-semibold">Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
