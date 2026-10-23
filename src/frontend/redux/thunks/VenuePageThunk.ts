import { Dispatch } from 'redux';
import AxiosAddBank from '../api/axiosApi';
import { fetchVenuePageFailure, fetchVenuePageRequest, fetchVenuePageSuccess } from '../actions/VenuePageAction';

export const fetchVenuePageData = (id: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchVenuePageRequest());
    try {
      const response = await AxiosAddBank.get(`/admin/venueDetail/${id}`);
      dispatch(fetchVenuePageSuccess(response.data.data));
    } catch (error: any) {
      dispatch(fetchVenuePageFailure(error.message || 'Failed to fetch venue page data'));
    }
  };
};