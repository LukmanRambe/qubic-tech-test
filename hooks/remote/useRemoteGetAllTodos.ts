import { useMemo } from 'react';

import type { Todos } from '@/ts/types/main/Todo';

import { useFetch } from '../useFetch';

const useRemoteGetAllTodos = (params: {
  is_complete: boolean;
  sort: string;
  offset: number;
  limit: number;
}) => {
  const url = `/task?is_complete=${params.is_complete}&sort=${params.sort}&offset=${params.offset}&limit=${params.limit}`;

  const { data, error, isFetching, refetch } = useFetch(url, [
    'getAllTodos',
    { params },
  ]);

  const newData = useMemo<Todos | undefined>(() => data?.data, [data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllTodos;
