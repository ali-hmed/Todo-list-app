import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, type ThemeMode } from '@/src/context/ThemeContext';

export default function SettingsScreen() {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const expoSdkVersion = Constants.expoConfig?.sdkVersion ?? 'SDK 54';

  const { themeMode, setThemeMode, colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  const themeOptions: Array<{ mode: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
    { mode: 'light', label: 'Light', icon: 'sunny-outline' },
    { mode: 'dark', label: 'Dark', icon: 'moon-outline' },
    { mode: 'system', label: 'System', icon: 'desktop-outline' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-black">
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Appearance Settings */}
        <View className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 gap-4">
          <View className="gap-1">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
              Appearance
            </Text>
            <Text className="text-base font-semibold text-slate-900 dark:text-white">
              Theme Mode
            </Text>
            <Text className="text-sm text-slate-500 dark:text-zinc-400">
              Select your preferred appearance across all screens. Currently active:{' '}
              <Text className="font-semibold text-slate-900 dark:text-white capitalize">
                {colorScheme} mode
              </Text>.
            </Text>
          </View>

          {/* Theme Selector Buttons */}
          <View className="flex-row gap-2">
            {themeOptions.map(({ mode, label, icon }) => {
              const isSelected = themeMode === mode;
              const activeIconColor = isSelected ? (isDark ? '#000000' : '#ffffff') : '#71717a';

              return (
                <Pressable
                  key={mode}
                  onPress={() => setThemeMode(mode)}
                  accessibilityRole="button"
                  accessibilityLabel={`Set theme to ${label}`}
                  className={`flex-1 items-center justify-center py-3.5 px-2 rounded-xl border gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white'
                      : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800'
                  }`}
                >
                  <Ionicons name={icon} size={20} color={activeIconColor} />
                  <Text
                    className={`text-xs font-bold ${
                      isSelected
                        ? 'text-white dark:text-black'
                        : 'text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* App Info */}
        <View className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 gap-3">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
            About
          </Text>
          <InfoRow label="App Version" value={`v${appVersion}`} />
          <InfoRow label="Built with" value={`Expo ${expoSdkVersion}`} />
          <InfoRow label="Framework" value="React Native + Expo Router" />
        </View>

        {/* Data Storage */}
        <View className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 gap-3">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
            Data Storage
          </Text>
          <View className="gap-1">
            <Text className="text-base font-medium text-slate-900 dark:text-white">
              Local storage
            </Text>
            <Text className="text-sm text-slate-500 dark:text-zinc-400">
              Todos are currently stored in memory and will reset when the app is closed.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-0.5">
      <Text className="text-sm text-slate-600 dark:text-zinc-400">{label}</Text>
      <Text className="text-sm font-medium text-slate-900 dark:text-white">{value}</Text>
    </View>
  );
}
