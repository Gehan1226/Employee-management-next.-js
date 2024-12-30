export type CountryDetails = {
    name: string;
    flag: string;
};

export type CountryDetailsResponse = {
    success: boolean;
    data?: CountryDetails[];
    message?: string;
};