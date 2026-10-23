

export const FETCH_RECENT_REQUEST = 'FETCH_RECENT_REQUEST';
export const FETCH_RECENT_SUCCESS = 'FETCH_RECENT_SUCCESS';
export const FETCH_RECENT_FAILURE = 'FETCH_RECENT_FAILURE';

export const fetchRecentViewRequest = () => ({
    type: FETCH_RECENT_REQUEST,
});

export const fetchRecentViewSuccess = (recentData: any) => ({
    type: FETCH_RECENT_SUCCESS,
    payload: recentData,
});

export const fetchRecentViewFailure = (error: string) => ({
    type: FETCH_RECENT_FAILURE,
    payload: error,
});
