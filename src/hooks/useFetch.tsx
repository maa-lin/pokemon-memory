import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = <T,>(urls: string[]): [boolean, T[] | undefined] => {
    const [data, setData] = useState<T[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);

                const responses = await Promise.all(urls.map((u) => axios.get<T>(u)));
                const data: T[] = responses.map((r) => r.data);
                
                setData(data);
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        
        if (data) return;

        getData();

    })
    
    return [loading, data];
}