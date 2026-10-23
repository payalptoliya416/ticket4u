

export const FETCH_VENUEPAGEDIRECT_REQUEST = 'FETCH_VENUEPAGEDIRECT_REQUEST';
export const FETCH_VENUEPAGEDIRECT_SUCCESS = 'FETCH_VENUEPAGEDIRECT_SUCCESS';
export const FETCH_VENUEPAGEDIRECT_FAILURE = 'FETCH_VENUEPAGEDIRECT_FAILURE';

export const fetchVenuePageDirectRequest = () => ({
    type: FETCH_VENUEPAGEDIRECT_REQUEST,
});

export const fetchVenuePageDirectSuccess = (VenuePageDirectData: any) => ({
    type: FETCH_VENUEPAGEDIRECT_SUCCESS,
    payload: VenuePageDirectData,
});

export const fetchVenuePageDirectFailure = (error: string) => ({
    type: FETCH_VENUEPAGEDIRECT_FAILURE,
    payload: error,
});
