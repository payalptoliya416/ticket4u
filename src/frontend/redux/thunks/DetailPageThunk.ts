
import { Dispatch } from 'redux';
import AxiosAddBank from '../api/axiosApi';
import { fetchDetailPageFailure, fetchDetailPageRequest, fetchDetailPageSuccess } from '../actions/DetailPageAction';

export const fetchBankData = (id: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchDetailPageRequest());
        try {
            const response = await AxiosAddBank.get(`/admin/eventDetail/${id}`, );
            dispatch(fetchDetailPageSuccess(response.data.data)); 
        } catch (error: any) {
            dispatch(fetchDetailPageFailure(error.message || 'Failed to fetch detailpage data'));
        }
    };
};
