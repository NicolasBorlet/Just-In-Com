import { useQuery } from '@tanstack/react-query';
import { fetchWeddings } from './weddingService';

export function useWeddingsQuery() {
		return useQuery({
			queryKey: ['weddings'],
			queryFn: fetchWeddings,
			staleTime: 1000 * 60 * 5, // 5 minutes
			refetchOnWindowFocus: false,
		});
}
