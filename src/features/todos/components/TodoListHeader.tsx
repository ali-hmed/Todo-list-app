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
      className="bg-white dark:bg-black border-b border-slate-200 dark:border-zinc-800"
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
                  className={`text-sm ${
                    isSelected
                      ? 'text-slate-900 dark:text-white font-bold'
                      : 'text-slate-500 dark:text-zinc-400 font-medium'
                  }`}
                >
                  {tab.label}
                </Text>
                <View
                  className={`min-w-5 h-5 rounded-full items-center justify-center px-1.5 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white'
                      : 'bg-slate-200 dark:bg-zinc-800'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isSelected
                        ? 'text-white dark:text-slate-950'
                        : 'text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    {tab.count}
                  </Text>
                </View>
              </View>

              {/* Active indicator bar */}
              <View
                className={`h-0.5 w-full rounded-full ${
                  isSelected ? 'bg-slate-900 dark:bg-white' : 'bg-transparent'
                }`}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
