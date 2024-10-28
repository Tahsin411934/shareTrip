import { useQuery } from '@tanstack/react-query';

interface Accessory {
    productName: string;
    price: number;
    discount?: number;
    description: string;
    imgUrl: string;
}

export const useFetchData = () => {
    const { data, isLoading, error } = useQuery<Accessory[]>({
        queryKey: ['data'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/api/accessories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    return { data, isLoading, error };
};
