

export const FETCH_DETAILPAGE_REQUEST = 'FETCH_DETAILPAGE_REQUEST';
export const FETCH_DETAILPAGE_SUCCESS = 'FETCH_DETAILPAGE_SUCCESS';
export const FETCH_DETAILPAGE_FAILURE = 'FETCH_DETAILPAGE_FAILURE';

export const fetchDetailPageRequest = () => ({
    type: FETCH_DETAILPAGE_REQUEST,
});

export const fetchDetailPageSuccess = (detailpage: any) => ({
    type: FETCH_DETAILPAGE_SUCCESS,
    payload: detailpage,
});

export const fetchDetailPageFailure = (error: string) => ({
    type: FETCH_DETAILPAGE_FAILURE,
    payload: error,
});
