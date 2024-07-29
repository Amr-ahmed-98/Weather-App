import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGeoLocation from "./useGeoLocation";
import { ApiResponse } from "../Components/interfaces/PrayerTimes";
import { useContext } from "react";
import { searchContex } from "../Context/searchContext";

export const usePrayerTimes = () => {
    const {coordinates, error: geoError, loaded} = useGeoLocation();
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const context = useContext(searchContex);

    if (!context) {
        throw new Error("useWeatherData must be used within a SearchProvider");
    }

    const { search } = context;

    const apiResponse = `https://api.aladhan.com/v1/timingsByAddress?address=${search}`;

    const params = search.length > 4 ? {} : {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
    };

    return useQuery<ApiResponse>({
        queryKey: ["prayer"],
        queryFn: async () => {
            if(!loaded || geoError || !coordinates?.lat || !coordinates?.lng){
                throw new Error("Location not available");
            }
            const response = await axios.get<ApiResponse>(search.length > 4 ? apiResponse : `https://api.aladhan.com/v1/timings/${currentDay}-${currentMonth}-${currentYear}`,{
                params: params,
            });
            return response.data;
        },
        enabled: loaded && !geoError && !!coordinates?.lat && !!coordinates?.lng
    });
};