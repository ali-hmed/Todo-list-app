import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../../../hooks/use-color-scheme';
import { dateToISOString, formatDueDate } from '../../utils/dateUtils';

interface DateSelectorProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function DateSelector({ value, onChange, label = 'Due Date' }: DateSelectorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const [viewDate, setViewDate] = useState(() => value || new Date());

  const selectedIso = value ? dateToISOString(value) : null;
  const todayIso = dateToISOString(new Date());

  // Preset Handlers
  const handleSelectToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    onChange(d);
  };

  const handleSelectTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    onChange(d);
  };

  const handleSelectNextWeek = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(0, 0, 0, 0);
    onChange(d);
  };

  const handleClear = () => {
    onChange(null);
  };

  // Calendar calculation
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    onChange(d);
    setModalVisible(false);
  };

  // Build grid of days
  const calendarCells: Array<{ day: number | null; iso: string | null }> = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push({ day: null, iso: null });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    calendarCells.push({ day: d, iso: dateToISOString(cellDate) });
  }

  // Determine active preset
  const isTodaySelected = selectedIso === todayIso;
  const tomorrowIso = dateToISOString(new Date(Date.now() + 86400000));
  const isTomorrowSelected = selectedIso === tomorrowIso;
  const nextWeekIso = dateToISOString(new Date(Date.now() + 7 * 86400000));
  const isNextWeekSelected = selectedIso === nextWeekIso;

  const displayDateText = value
    ? `${dateToISOString(value)} (${formatDueDate(dateToISOString(value))})`
    : '';

  const activeIconColor = value ? (isDark ? '#ffffff' : '#000000') : '#64748b';

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-slate-700 dark:text-zinc-300">
        {label}
      </Text>

      {/* Main trigger button displaying current selection */}
      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={() => {
            setViewDate(value || new Date());
            setModalVisible(true);
          }}
          accessibilityRole="button"
          accessibilityLabel={`Select due date. Current selection: ${displayDateText || 'None'}`}
          className={`flex-1 flex-row items-center justify-between px-3.5 py-3 rounded-xl border ${
            value
              ? 'bg-slate-100 dark:bg-zinc-900 border-slate-900 dark:border-white'
              : 'bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800'
          }`}
        >
          <View className="flex-row items-center gap-2.5 flex-1 pr-2">
            <Ionicons
              name="calendar-outline"
              size={20}
              color={activeIconColor}
            />
            <Text
              className={`text-base ${
                value
                  ? 'text-slate-900 dark:text-white font-bold'
                  : 'text-slate-400 dark:text-zinc-500 font-medium'
              }`}
              numberOfLines={1}
            >
              {value ? displayDateText : 'Select due date…'}
            </Text>
          </View>
          <Ionicons
            name="chevron-down"
            size={18}
            color={activeIconColor}
          />
        </Pressable>

        {value && (
          <Pressable
            onPress={handleClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear due date"
            className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-900 items-center justify-center border border-slate-200 dark:border-zinc-800"
          >
            <Ionicons name="close" size={18} color={isDark ? '#a1a1aa' : '#64748b'} />
          </Pressable>
        )}
      </View>

      {/* Quick Select Preset Pills */}
      <View className="flex-row flex-wrap gap-2 mt-1">
        <Pressable
          onPress={handleSelectToday}
          className={`px-3 py-1.5 rounded-lg border ${
            isTodaySelected
              ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white'
              : 'bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800'
          }`}
        >
          <Text
            className={`text-xs ${
              isTodaySelected
                ? 'text-white dark:text-slate-950 font-bold'
                : 'text-slate-700 dark:text-zinc-300 font-medium'
            }`}
          >
            Today
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSelectTomorrow}
          className={`px-3 py-1.5 rounded-lg border ${
            isTomorrowSelected
              ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white'
              : 'bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800'
          }`}
        >
          <Text
            className={`text-xs ${
              isTomorrowSelected
                ? 'text-white dark:text-slate-950 font-bold'
                : 'text-slate-700 dark:text-zinc-300 font-medium'
            }`}
          >
            Tomorrow
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSelectNextWeek}
          className={`px-3 py-1.5 rounded-lg border ${
            isNextWeekSelected
              ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white'
              : 'bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800'
          }`}
        >
          <Text
            className={`text-xs ${
              isNextWeekSelected
                ? 'text-white dark:text-slate-950 font-bold'
                : 'text-slate-700 dark:text-zinc-300 font-medium'
            }`}
          >
            Next Week
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setViewDate(value || new Date());
            setModalVisible(true);
          }}
          className="px-3 py-1.5 rounded-lg border bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 flex-row items-center gap-1"
        >
          <Ionicons name="calendar-sharp" size={12} color={isDark ? '#a1a1aa' : '#64748b'} />
          <Text className="text-xs font-medium text-slate-700 dark:text-zinc-300">
            Pick Date…
          </Text>
        </Pressable>
      </View>

      {/* Calendar Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1 bg-black/60 justify-center items-center p-4"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white dark:bg-zinc-950 rounded-2xl p-5 shadow-2xl border border-slate-200 dark:border-zinc-800"
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900 dark:text-white">
                Select Due Date
              </Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-zinc-900"
              >
                <Ionicons name="close" size={18} color={isDark ? '#a1a1aa' : '#64748b'} />
              </Pressable>
            </View>

            {/* Month / Year Navigator */}
            <View className="flex-row items-center justify-between mb-4 px-1">
              <Pressable
                onPress={handlePrevMonth}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-900"
              >
                <Ionicons name="chevron-back" size={20} color={isDark ? '#ffffff' : '#000000'} />
              </Pressable>

              <Text className="text-base font-bold text-slate-900 dark:text-white">
                {MONTH_NAMES[month]} {year}
              </Text>

              <Pressable
                onPress={handleNextMonth}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-900"
              >
                <Ionicons name="chevron-forward" size={20} color={isDark ? '#ffffff' : '#000000'} />
              </Pressable>
            </View>

            {/* Weekday Header */}
            <View className="flex-row mb-2">
              {WEEKDAYS.map((wd) => (
                <Text
                  key={wd}
                  className="flex-1 text-center text-xs font-bold text-slate-400 dark:text-zinc-500"
                >
                  {wd}
                </Text>
              ))}
            </View>

            {/* Days Grid */}
            <View className="flex-row flex-wrap">
              {calendarCells.map((cell, index) => {
                if (cell.day === null) {
                  return <View key={`empty-${index}`} className="w-[14.28%] aspect-square" />;
                }
                const isSelected = cell.iso === selectedIso;
                const isTodayCell = cell.iso === todayIso;

                return (
                  <Pressable
                    key={cell.iso}
                    onPress={() => handleSelectDay(cell.day!)}
                    className="w-[14.28%] aspect-square p-1 items-center justify-center"
                  >
                    <View
                      className={`w-9 h-9 rounded-full items-center justify-center ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-white shadow'
                          : isTodayCell
                          ? 'border-2 border-slate-900 dark:border-white bg-slate-100 dark:bg-zinc-900'
                          : ''
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isSelected
                            ? 'text-white dark:text-slate-950 font-bold'
                            : isTodayCell
                            ? 'text-slate-900 dark:text-white font-bold'
                            : 'text-slate-800 dark:text-zinc-200 font-medium'
                        }`}
                      >
                        {cell.day}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* Bottom Actions */}
            <View className="flex-row items-center justify-between mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800">
              <Pressable
                onPress={() => {
                  handleClear();
                  setModalVisible(false);
                }}
                className="px-3 py-2 rounded-lg"
              >
                <Text className="text-sm font-semibold text-danger">Clear Date</Text>
              </Pressable>

              <Pressable
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-zinc-800"
              >
                <Text className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
