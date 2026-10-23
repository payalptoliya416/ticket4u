
import { Dispatch } from 'redux';
import AxiosAddBank from '../api/axiosApi';
import { fetchRecentViewFailure, fetchRecentViewRequest, fetchRecentViewSuccess } from '../actions/RecentViewAction';

export const fetchRecentView = (id: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchRecentViewRequest());
        try {
            const response = await AxiosAddBank.post(`/add-recent-events`,{
                "event_id":id
            } );
            dispatch(fetchRecentViewSuccess(response.data)); 
        } catch (error: any) {
            dispatch(fetchRecentViewFailure(error.message || 'Failed to fetch viewData data'));
        }
    };
};
