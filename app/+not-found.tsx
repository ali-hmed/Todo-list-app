import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950 p-8">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-3">
          Screen Not Found
        </Text>
        <Text className="text-base text-slate-500 dark:text-slate-400 text-center mb-6">
          This page doesn&apos;t exist.
        </Text>
        <Link
          href="/(tabs)"
          className="text-base font-semibold text-brand dark:text-brand-light"
        >
          Go to Todos
        </Link>
      </View>
    </>
  );
}
