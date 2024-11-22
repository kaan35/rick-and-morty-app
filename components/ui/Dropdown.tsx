import CheckBox from '@/components/ui/Checkbox';
import {LoadingArea} from '@/components/ui/LoadingArea';
import {ThemedText} from '@/components/ui/ThemedText';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {Colors} from '@/constants/Colors';
import {Styles} from '@/utils/Styles';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  VirtualizedList,
} from 'react-native';
import Accordion from '@/components/ui/Accordion';

type ItemData = {
  episode?: [];
  episodeCount: number;
  id: number;
  image: string;
  name: string;
};

export function Dropdown({
  data,
  error,
  isError,
  isFetching,
  isPending,
  page,
  searchData,
  setPage,
}: {
  data?: {
    results: [];
    info: {pages: number; prev: string; next: string};
  };
  error?: {message: string} | null;
  isError?: true | false;
  isFetching?: boolean;
  isPending?: false | true;
  items?: [{description?: string; id: number; image?: string; title: string}];
  page?: number;
  searchData: (keyword: string) => void;
  setPage: (value: ((prevState: number) => number) | number) => void;
}) {
  const colorScheme = useColorScheme();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleItem = (item: {id: number; name: string}) => {
    let itemList = [];
    if (
      selectedItems?.find((element: {id: number}) => element.id === item.id)
    ) {
      itemList = selectedItems?.filter(
        (element: {id: number}) => element.id !== item.id,
      );
    } else {
      if (selectedItems?.length > 0) {
        itemList = [...selectedItems, item];
      } else {
        itemList = [item];
      }
    }

    setSelectedItems(itemList);
  };

  const getItemCount = (_data: unknown) => data?.results?.length;

  const HighlightedText = ({text}: {text: string}) => {
    const index = text.toLowerCase().indexOf(searchKeyword.toLowerCase());
    let result = text;
    if (index >= 0 && searchKeyword?.length > 0) {
      return (
        <View className="pl-2" style={Styles.row}>
          {text.substring(0, index) ? (
            <ThemedText>{text.substring(0, index)}</ThemedText>
          ) : (
            ''
          )}
          <ThemedText type="highlighted">
            {text.substring(index, index + searchKeyword.length)}
          </ThemedText>
          <ThemedText>
            {text.substring(index + searchKeyword.length)}
          </ThemedText>
        </View>
      );
    }
    return (
      <View className="pl-2">
        <ThemedText>{result}</ThemedText>
      </View>
    );
  };

  const getItem = (_data: [ItemData], index: number): ItemData => ({
    episodeCount: _data[index]?.episode?.length || 0,
    id: _data[index]?.id,
    image: _data[index]?.image,
    name: _data[index]?.name,
  });

  const LoadMore = () => {
    if (data?.info?.next) setPage(old => old + 1);
  };

  const LoadPrevious = () => {
    setPage(old => Math.max(old - 1, 0));
  };

  const Item = ({item}: {item: ItemData}) => (
    <View
      className="border-b border-b-gray-300 dark:border-b-sky-500"
      style={Styles.rowLeft}>
      <View>
        <CheckBox
          onPress={() => toggleItem({id: item.id, name: item.name})}
          isChecked={selectedItems?.find(
            (element: {id: number}) => element.id === item.id,
          )}
        />
      </View>
      <View>
        <Image
          className="rounded-lg"
          width={50}
          height={50}
          source={{uri: item?.image}}
        />
      </View>
      <View>
        <View>
          <Text className="text-black dark:text-white text-base text-wrap mr-24">
            <HighlightedText text={item?.name} />
          </Text>
        </View>
        <View className="pl-2">
          <ThemedText type="subTitleMuted">
            {item?.episodeCount > 0
              ? item?.episodeCount > 1
                ? `${item.episodeCount} Episodes`
                : `${item.episodeCount} Episode`
              : ''}
          </ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <View className="px-5 justify-center text-center ">
      <View className="border-sky-500 border-2 rounded-lg my-2 p-3 bg-white dark:bg-slate-800">
        <ScrollView className="max-h-60">
          <View
            className="py-0 my-0 gap-1 flex-auto flex-wrap"
            style={Styles.rowCenter}>
            {selectedItems?.map((item: {id: number; name: string}, index) => (
              <TouchableOpacity
                className="ml-2"
                key={index}
                onPress={() => toggleItem({id: item.id, name: item.name})}>
                <View
                  className="p-2 bg-black dark:bg-white rounded-lg gap-2"
                  style={Styles.row}>
                  <Text className="text-white dark:text-black">
                    {item.name}
                  </Text>
                  <IconSymbol name={'close-circle-outline'} />
                </View>
              </TouchableOpacity>
            ))}
            <TextInput
              className="flex-shrink-0 p-2 h-12 flex-grow text-black dark:text-white"
              placeholder={'Search'}
              placeholderTextColor={Colors[colorScheme ?? 'light'].text}
              onChangeText={value => {
                setSearchKeyword(value);
                if (!isExpanded) setIsExpanded(true);
                searchData(value);
              }}
            />
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <View style={Styles.rowBetween}>
                <IconSymbol name={isExpanded ? 'chevron-up' : 'chevron-down'} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View>
        <Accordion isExpanded={isExpanded} viewKey="Accordion">
          <View className="border-sky-500 border-2 rounded-lg p-3 bg-white dark:bg-slate-800 h-96 pb-12 w-full">
            {isPending || isFetching ? (
              <View>
                <LoadingArea />
              </View>
            ) : isError ? (
              <View>
                <ThemedText>Error: {error?.message}</ThemedText>
              </View>
            ) : (
              <View>
                {data?.results?.length ? (
                  <View>
                    <View className="py-2" style={Styles.rowBetween}>
                      <View>
                        <ThemedText type="subTitleMuted">
                          Current Page: {page}/{data?.info?.pages}
                        </ThemedText>
                      </View>
                      {data?.info?.prev ? (
                        <TouchableOpacity onPress={() => LoadPrevious()}>
                          <View style={Styles.rowBetween}>
                            <IconSymbol name={'chevron-back'} />
                            <ThemedText>Previous</ThemedText>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        ''
                      )}
                    </View>
                    <VirtualizedList
                      data={data?.results}
                      getItem={getItem}
                      getItemCount={getItemCount}
                      keyExtractor={item => item?.id}
                      onEndReached={LoadMore}
                      renderItem={({item}) => <Item item={item} />}
                    />
                  </View>
                ) : (
                  <View className="justify-center items-center">
                    <Text className="text-black dark:text-white text-base text-center">
                      Not found data
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </Accordion>
      </View>
    </View>
  );
}
