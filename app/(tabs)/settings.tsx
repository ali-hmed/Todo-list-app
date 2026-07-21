import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function SettingsScreen() {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const expoSdkVersion = Constants.expoConfig?.sdkVersion ?? 'SDK 54';

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* App Info */}
        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 gap-3">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            About
          </Text>
          <InfoRow label="App Version" value={`v${appVersion}`} />
          <InfoRow label="Built with" value={`Expo ${expoSdkVersion}`} />
          <InfoRow label="Framework" value="React Native + Expo Router" />
        </View>

        {/* Theme */}
        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 gap-3">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Appearance
          </Text>
          <View className="gap-1">
            <Text className="text-base font-medium text-slate-900 dark:text-white">
              Theme
            </Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              The app follows your device's system appearance setting (light or dark mode). Manual theme switching will be available in a future update.
            </Text>
          </View>
        </View>

        {/* Data */}
        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 gap-3">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Data Storage
          </Text>
          <View className="gap-1">
            <Text className="text-base font-medium text-slate-900 dark:text-white">
              Local storage
            </Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Todos are currently stored in memory and will reset when the app is closed. Persistent local storage will be added in the next update.
            </Text>
          </View>
        </View>

        {/* Coming Soon */}
        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 gap-3">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Coming Soon
          </Text>
          {[
            'Persistent local storage',
            'Manual light / dark mode toggle',
            'Categories and tags',
            'Reminders and notifications',
            'Cloud sync',
          ].map((feature) => (
            <View key={feature} className="flex-row items-center gap-2">
              <View className="w-1.5 h-1.5 rounded-full bg-brand" />
              <Text className="text-sm text-slate-600 dark:text-slate-300">
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-0.5">
      <Text className="text-sm text-slate-600 dark:text-slate-400">{label}</Text>
      <Text className="text-sm font-medium text-slate-900 dark:text-white">{value}</Text>
    </View>
  );
}
