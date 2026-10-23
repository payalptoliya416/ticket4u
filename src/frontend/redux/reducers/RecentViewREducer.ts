
import { FETCH_RECENT_FAILURE, FETCH_RECENT_REQUEST, FETCH_RECENT_SUCCESS } from '../actions/RecentViewAction';

interface RecenterViewStatus {
    loading: boolean;
    recentData: any;
    error: string | null;
}

const initialState: RecenterViewStatus = {
    loading: false,
    recentData: null,
    error: null,
};

export const recenterViewReducer = (state = initialState, action: any): RecenterViewStatus => {
    switch (action.type) {
        case FETCH_RECENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_RECENT_SUCCESS:
            return { ...state, loading: false, recentData: action.payload };
        case FETCH_RECENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
