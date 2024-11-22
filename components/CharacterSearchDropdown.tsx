import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from '@/components/ui/Dropdown';

export function CharacterSearchDropdown() {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1, name: string) =>
    await fetch(
      `https://rickandmortyapi.com/api/character?name=${name}&page=${page}`,
    ).then(res => res.json());

  const {isPending, isError, error, data, isFetching} = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => fetchData(page, name),
    queryKey: ['characters', page, 'keyword', name],
  });

  const searchData = (keyword: string) => {
    if (keyword?.length > 1) {
      setName(keyword);
      setPage(1);
    } else {
      setName('');
      setPage(0);
    }
  };

  return (
    <View className="px-5 justify-center text-center">
      <Dropdown
        data={data}
        error={error}
        isError={isError}
        isFetching={isFetching}
        isPending={isPending}
        page={page}
        searchData={searchData}
        setPage={setPage}
      />
    </View>
  );
}
