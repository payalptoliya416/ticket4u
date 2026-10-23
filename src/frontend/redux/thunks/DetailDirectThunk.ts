
import { Dispatch } from 'redux';
import AxiosAddBank from '../api/axiosApi';
import { fetchDetailPageDirectFailure, fetchDetailPageDirectRequest, fetchDetailPageDirectSuccess } from '../actions/DetailPageDirectACtion';

export const fetchDetaiDirect = (slug: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchDetailPageDirectRequest());
        try {
            const response = await AxiosAddBank.get(`/admin/eventDetailSlug/${slug}`, );
            dispatch(fetchDetailPageDirectSuccess(response.data.data)); 
        } catch (error: any) {
            dispatch(fetchDetailPageDirectFailure(error.message || 'Failed to fetch detailpage single data'));
        }
    };
};
