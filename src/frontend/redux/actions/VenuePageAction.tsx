

export const FETCH_VENUEPAGE_REQUEST = 'FETCH_VENUEPAGE_REQUEST';
export const FETCH_VENUEPAGE_SUCCESS = 'FETCH_VENUEPAGE_SUCCESS';
export const FETCH_VENUEPAGE_FAILURE = 'FETCH_VENUEPAGE_FAILURE';

export const fetchVenuePageRequest = () => ({
    type: FETCH_VENUEPAGE_REQUEST,
});

export const fetchVenuePageSuccess = (VenuePageData: any) => ({
    type: FETCH_VENUEPAGE_SUCCESS,
    payload: VenuePageData,
});

export const fetchVenuePageFailure = (error: string) => ({
    type: FETCH_VENUEPAGE_FAILURE,
    payload: error,
});
