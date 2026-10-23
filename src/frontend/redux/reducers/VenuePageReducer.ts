import { FETCH_VENUEPAGE_FAILURE, FETCH_VENUEPAGE_REQUEST, FETCH_VENUEPAGE_SUCCESS } from "../actions/VenuePageAction";


interface VenuePageStatus {
    loading: boolean;
    VenuePageData: any;
    error: string | null;
}

const initialState: VenuePageStatus = {
    loading: false,
    VenuePageData: null,
    error: null,
};

export const venuePageReducer = (state = initialState, action: any): VenuePageStatus => {
    switch (action.type) {
        case FETCH_VENUEPAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_VENUEPAGE_SUCCESS:
            return { ...state, loading: false, VenuePageData: action.payload };
        case FETCH_VENUEPAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
