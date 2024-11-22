import {View} from 'react-native';
import {CharacterSearchDropdown} from '@/components/CharacterSearchDropdown';

export default function HomeScreen() {
  return (
    <View className="flex-1 px-5 justify-center text-center bg-zinc-300 dark:bg-gray-950">
      <CharacterSearchDropdown />
    </View>
  );
}
