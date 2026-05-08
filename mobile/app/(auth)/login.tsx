import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic mock login - later connect to AWS Cognito
    if (email && password) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View className="flex-1 bg-slate-900 justify-center px-6">
      <View className="items-center mb-10">
        <Text className="text-4xl font-extrabold text-green-400 tracking-tight">duoling</Text>
        <Text className="text-slate-300 mt-2 text-base">Aprenda tech jogando</Text>
      </View>

      <View className="w-full">
        <TextInput 
          className="bg-slate-800 text-white px-4 py-4 rounded-2xl border border-slate-700"
          placeholder="Seu email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput 
          className="bg-slate-800 text-white px-4 py-4 rounded-2xl border border-slate-700 mt-4"
          placeholder="Sua senha"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          className="bg-green-500 py-4 rounded-2xl mt-8 shadow-lg shadow-green-500/30 active:bg-green-600"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold text-lg">Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-6">
          <Text className="text-center text-green-400 font-semibold">Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
