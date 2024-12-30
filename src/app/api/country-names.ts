"use server";
import { CountryDetails, CountryDetailsResponse } from "../types/responseTypes";

export const getCountriesAndFlags = async (): Promise<CountryDetailsResponse> => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');

        if (!response.ok) {
            throw new Error(`Error fetching countries: ${response.statusText}`);
        }
        const data = await response.json();
        const countries: CountryDetails[] = data.map((country: any) => ({
            name: country.name.common,
            flag: country.flags.png,
        }));
        return { success: true, data: countries };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
};