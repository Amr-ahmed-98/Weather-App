import { useQuery } from "@tanstack/react-query";
import useGeoLocation from "./useGeoLocation";
import axios from "axios";
import { useContext } from "react";
import { searchContex } from "../Context/searchContext";

const useWeatherData = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
        throw new Error('No API key provided');
    }

    const cleanApiKey = apiKey.replace(/^['"%]|['"%];?$/g, '');
    const { loaded, coordinates, error } = useGeoLocation();
    const { lat, lng } = coordinates;

    const context = useContext(searchContex);

    if (!context) {
        throw new Error("useWeatherData must be used within a SearchProvider");
    }

    const { search } = context;

    const query = search.length > 4 ? search : `${lat},${lng}`;
    

    return useQuery({
        queryKey: ['weatherCard', coordinates,query],
        queryFn: async () => {
            if (!loaded || error || !lat || !lng) {
                throw new Error('Location not available');
            }
            return await axios.get('https://api.weatherapi.com/v1/current.json', {
                params: {
                    key: cleanApiKey,
                    q: query,
                },
            });
        },
        enabled: !!lat && !!lng,
    });
}

export default useWeatherData;
