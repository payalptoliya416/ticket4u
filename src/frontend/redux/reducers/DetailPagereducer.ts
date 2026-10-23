import { FETCH_DETAILPAGE_FAILURE, FETCH_DETAILPAGE_REQUEST, FETCH_DETAILPAGE_SUCCESS } from '../actions/DetailPageAction';

interface DetailPageStatus {
    loading: boolean;
    detailpage: any;
    error: string | null;
}

const initialState: DetailPageStatus = {
    loading: false,
    detailpage: null,
    error: null,
};

export const detailPageReducer = (state = initialState, action: any): DetailPageStatus => {
    switch (action.type) {
        case FETCH_DETAILPAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DETAILPAGE_SUCCESS:
            return { ...state, loading: false, detailpage: action.payload };
        case FETCH_DETAILPAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
