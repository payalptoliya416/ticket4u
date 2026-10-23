import { FETCH_VENUEPAGE_FAILURE, FETCH_VENUEPAGE_REQUEST, FETCH_VENUEPAGE_SUCCESS } from "../actions/VenuePageAction";


interface VenuePageDirectStatus {
    loading: boolean;
    VenuePageDirectData: any;
    error: string | null;
}

const initialState: VenuePageDirectStatus = {
    loading: false,
    VenuePageDirectData: null,
    error: null,
};

export const venuePageDirectReducer = (state = initialState, action: any): VenuePageDirectStatus => {
    switch (action.type) {
        case FETCH_VENUEPAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_VENUEPAGE_SUCCESS:
            return { ...state, loading: false, VenuePageDirectData: action.payload };
        case FETCH_VENUEPAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
