

export const FETCH_DETAILPAGEDIRECT_REQUEST = 'FETCH_DETAILPAGEDIRECT_REQUEST';
export const FETCH_DETAILPAGEDIRECT_SUCCESS = 'FETCH_DETAILPAGEDIRECT_SUCCESS';
export const FETCH_DETAILPAGEDIRECT_FAILURE = 'FETCH_DETAILPAGEDIRECT_FAILURE';

export const fetchDetailPageDirectRequest = () => ({
    type: FETCH_DETAILPAGEDIRECT_REQUEST,
});

export const fetchDetailPageDirectSuccess = (detailpageDirect: any) => ({
    type: FETCH_DETAILPAGEDIRECT_SUCCESS,
    payload: detailpageDirect,
});

export const fetchDetailPageDirectFailure = (error: string) => ({
    type: FETCH_DETAILPAGEDIRECT_FAILURE,
    payload: error,
});
