import { useQuery } from '@tanstack/react-query';
import { fetchGlobal } from './globalsServices';

export function useGlobalQuery() {
		return useQuery({
			queryKey: ['global'],
			queryFn: fetchGlobal,
			staleTime: 1000 * 60 * 5, // 5 minutes
			refetchOnWindowFocus: false,
		});
}
