import { useThemeStore } from "@/src/app-core/Store/themeStore";
import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createStyles } from "./styles";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  value: string | number | (string | number)[];
  onChange: (value: string | (string | number)[]) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  appearance?: "dark" | "light";
  multiple?: boolean;
  style?: any;
  errors?: string;
}

export const MainSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  isError = false,
  appearance = "light",
  multiple = false,
  style,
  errors,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = useThemeStore((state) => state.colors);
  const styles = createStyles(colors);

  const colorConfig = {
    light: {
      color: colors.textPrimary,
      border: colors.border,
      placeholder: "#9e9e9e",
    },
    dark: {
      color: colors.textPrimary,
      border: colors.border,
      placeholder: "#bdbdbd",
    },
  };

  const currentTheme = colorConfig[appearance];

  const selectedValues = useMemo(() => {
    if (!multiple) return [];
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }, [multiple, value]);

  const handleOptionClick = (optionValue: string | number) => {
    if (!multiple) {
      onChange(optionValue.toString());
      return;
    }

    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];

    onChange(newValues);
  };

  const isSelected = (optionValue: string | number) => {
    if (multiple) return selectedValues.includes(optionValue);
    return value === optionValue;
  };

  if (!multiple) {
    return (
      <View
        style={[
          styles.pickerWrapper,
          {
            borderColor: isError ? colors.error : currentTheme.border,
          },
          disabled && styles.disabled,
          style,
        ]}
      >
        <Picker
          enabled={!disabled}
          selectedValue={value ?? ""}
          onValueChange={(itemValue) => onChange(String(itemValue))}
          dropdownIconColor={isError ? colors.error : colors.textSecondary}
          style={[
            styles.picker,
            {
              color: value ? currentTheme.color : currentTheme.placeholder,
            },
          ]}
        >
          <Picker.Item
            label={placeholder}
            value=""
            color={currentTheme.placeholder}
          />
          {options.map((option) => (
            <Picker.Item
              key={String(option.value)}
              label={option.label}
              value={option.value}
              color={currentTheme.color}
            />
          ))}
        </Picker>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.wrapper, style]}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={disabled}
          onPress={() => setIsOpen(true)}
          style={[
            styles.trigger,
            {
              borderColor: isError ? colors.error : currentTheme.border,
            },
            disabled && styles.disabled,
          ]}
        >
          <View style={styles.selectedDisplay}>
            {selectedValues.length > 0 ? (
              <View style={styles.pill}>
                <Text style={styles.pillText}>
                  {selectedValues.length} selected
                </Text>
              </View>
            ) : (
              <Text
                numberOfLines={1}
                style={[
                  styles.placeholderText,
                  { color: currentTheme.placeholder },
                ]}
              >
                {placeholder}
              </Text>
            )}
          </View>

          <Text style={styles.chevron}>▼</Text>
        </TouchableOpacity>

        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
            <Pressable
              style={[
                styles.dropdown,
                {
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <ScrollView>
                {options.map((option) => {
                  const selected = isSelected(option.value);

                  return (
                    <TouchableOpacity
                      key={String(option.value)}
                      onPress={() => handleOptionClick(option.value)}
                      style={[styles.option, selected && styles.selectedOption]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color: selected
                              ? colors.primary
                              : currentTheme.color,
                          },
                        ]}
                      >
                        {option.label}
                      </Text>
                      {selected && <Text style={styles.checkIcon}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={styles.doneButton}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
      {errors && (
        <Text style={[styles.error, { color: colors.error }]}>{errors}</Text>
      )}
    </>
  );
};
