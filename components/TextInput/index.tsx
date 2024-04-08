import { useRef } from 'react';
import { Pressable, TextInput as ReactTextInput } from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';

export const TextInput = (props: TextInputProps) => {
  const { label, mode, placeholder, style, value, onChangeText } = props;

  const ref = useRef<ReactTextInput>(null);

  return (
    <Pressable style={{ flex: 1 }} onPress={() => ref.current.focus()}>
      <PaperTextInput
        mode={mode}
        label={label}
        placeholder={placeholder}
        multiline
        style={style}
        value={value}
        onChangeText={onChangeText}
        ref={ref}
      />
    </Pressable>
  );
};
