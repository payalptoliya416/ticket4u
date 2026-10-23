import { Dispatch } from 'redux';
import AxiosAddBank from '../api/axiosApi';
import { fetchVenuePageDirectFailure, fetchVenuePageDirectRequest, fetchVenuePageDirectSuccess } from '../actions/VenueDirectAction';

export const fetchVenuePageDirectData = (id: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchVenuePageDirectRequest());
    try {
      const response = await AxiosAddBank.get(`/admin/venueDetail/${id}`);
      dispatch(fetchVenuePageDirectSuccess(response.data.data));
    } catch (error: any) {
      dispatch(fetchVenuePageDirectFailure(error.message || 'Failed to fetch venue page single data'));
    }
  };
};