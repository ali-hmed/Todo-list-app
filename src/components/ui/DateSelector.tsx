import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
              ? 'bg-brand/5 dark:bg-brand/10 border-brand'
              : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
          }`}
        >
          <View className="flex-row items-center gap-2.5 flex-1 pr-2">
            <Ionicons
              name="calendar-outline"
              size={20}
              color={value ? '#2563eb' : '#64748b'}
            />
            <Text
              className={`text-base font-medium ${
                value
                  ? 'text-brand dark:text-blue-400 font-semibold'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
              numberOfLines={1}
            >
              {value ? displayDateText : 'Select due date…'}
            </Text>
          </View>
          <Ionicons
            name="chevron-down"
            size={18}
            color={value ? '#2563eb' : '#94a3b8'}
          />
        </Pressable>

        {value && (
          <Pressable
            onPress={handleClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear due date"
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 items-center justify-center border border-slate-200 dark:border-slate-700"
          >
            <Ionicons name="close" size={18} color="#64748b" />
          </Pressable>
        )}
      </View>

      {/* Quick Select Preset Pills */}
      <View className="flex-row flex-wrap gap-2 mt-1">
        <Pressable
          onPress={handleSelectToday}
          className={`px-3 py-1.5 rounded-lg border ${
            isTodaySelected
              ? 'bg-brand border-brand'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              isTodaySelected
                ? 'text-white font-semibold'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Today
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSelectTomorrow}
          className={`px-3 py-1.5 rounded-lg border ${
            isTomorrowSelected
              ? 'bg-brand border-brand'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              isTomorrowSelected
                ? 'text-white font-semibold'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Tomorrow
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSelectNextWeek}
          className={`px-3 py-1.5 rounded-lg border ${
            isNextWeekSelected
              ? 'bg-brand border-brand'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              isNextWeekSelected
                ? 'text-white font-semibold'
                : 'text-slate-700 dark:text-slate-300'
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
          className="px-3 py-1.5 rounded-lg border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex-row items-center gap-1"
        >
          <Ionicons name="calendar-sharp" size={12} color="#64748b" />
          <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
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
          className="flex-1 bg-black/50 justify-center items-center p-4"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900 dark:text-white">
                Select Due Date
              </Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="p-1 rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <Ionicons name="close" size={20} color="#64748b" />
              </Pressable>
            </View>

            {/* Month / Year Navigator */}
            <View className="flex-row items-center justify-between mb-4 px-1">
              <Pressable
                onPress={handlePrevMonth}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
              >
                <Ionicons name="chevron-back" size={20} color="#64748b" />
              </Pressable>

              <Text className="text-base font-semibold text-slate-800 dark:text-slate-200">
                {MONTH_NAMES[month]} {year}
              </Text>

              <Pressable
                onPress={handleNextMonth}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
              >
                <Ionicons name="chevron-forward" size={20} color="#64748b" />
              </Pressable>
            </View>


            {/* Weekday Header */}
            <View className="flex-row mb-2">
              {WEEKDAYS.map((wd) => (
                <Text
                  key={wd}
                  className="flex-1 text-center text-xs font-bold text-slate-400 dark:text-slate-500"
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
                          ? 'bg-brand shadow'
                          : isTodayCell
                          ? 'border border-brand bg-brand/10'
                          : ''
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isSelected
                            ? 'text-white font-bold'
                            : isTodayCell
                            ? 'text-brand font-bold'
                            : 'text-slate-800 dark:text-slate-200 font-medium'
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
            <View className="flex-row items-center justify-between mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Pressable
                onPress={() => {
                  handleClear();
                  setModalVisible(false);
                }}
                className="px-3 py-2 rounded-lg"
              >
                <Text className="text-sm font-medium text-danger">Clear Date</Text>
              </Pressable>

              <Pressable
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800"
              >
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">
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
