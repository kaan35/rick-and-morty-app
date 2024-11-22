import {ActivityIndicator, Text, View} from 'react-native';

export function LoadingArea({text = 'Loading...'}: {text?: string}) {
  const LoadingIndicator = () => (
    <ActivityIndicator className="text-black dark:text-white" size="large" />
  );

  return (
    <View>
      <View className="mb-5">
        <Text className="text-black dark:text-white text-center">{text}</Text>
      </View>
      <LoadingIndicator />
    </View>
  );
}
