
import { FETCH_DETAILPAGEDIRECT_FAILURE, FETCH_DETAILPAGEDIRECT_REQUEST, FETCH_DETAILPAGEDIRECT_SUCCESS } from '../actions/DetailPageDirectACtion';

interface DetailPageDurectStatus {
    loading: boolean;
    detailpageDirect: any;
    error: string | null;
}

const initialState: DetailPageDurectStatus = {
    loading: false,
    detailpageDirect: null,
    error: null,
};

export const detailPageDirectReducer = (state = initialState, action: any): DetailPageDurectStatus => {
    switch (action.type) {
        case FETCH_DETAILPAGEDIRECT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DETAILPAGEDIRECT_SUCCESS:
            return { ...state, loading: false, detailpageDirect: action.payload };
        case FETCH_DETAILPAGEDIRECT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
