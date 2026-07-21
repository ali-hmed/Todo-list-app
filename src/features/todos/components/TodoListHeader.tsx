import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { TodoFilter } from '../types';

interface FilterTab {
  key: TodoFilter;
  label: string;
  count: number;
}

interface TodoListHeaderProps {
  filter: TodoFilter;
  totalCount: number;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: TodoFilter) => void;
}

export function TodoListHeader({
  filter,
  totalCount,
  activeCount,
  completedCount,
  onFilterChange,
}: TodoListHeaderProps) {
  const tabs: FilterTab[] = [
    { key: 'all', label: 'All', count: totalCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Done', count: completedCount },
  ];

  return (
    <View
      className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
      accessibilityRole="tablist"
    >
      <View className="flex-row">
        {tabs.map((tab) => {
          const isSelected = filter === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onFilterChange(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${tab.label} tab, ${tab.count} item${tab.count !== 1 ? 's' : ''}`}
              className="flex-1 items-center py-3 px-2 gap-1"
            >
              <View className="flex-row items-center gap-1.5">
                <Text
                  className={`text-sm font-semibold ${
                    isSelected
                      ? 'text-brand dark:text-brand-light'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tab.label}
                </Text>
                <View
                  className={`min-w-5 h-5 rounded-full items-center justify-center px-1.5 ${
                    isSelected
                      ? 'bg-brand'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </Text>
                </View>
              </View>

              {/* Active indicator bar */}
              <View
                className={`h-0.5 w-full rounded-full ${
                  isSelected ? 'bg-brand' : 'bg-transparent'
                }`}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
