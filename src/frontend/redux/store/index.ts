

import { configureStore } from '@reduxjs/toolkit';  
import { detailPageReducer } from '../reducers/DetailPagereducer';
import { venuePageReducer } from '../reducers/VenuePageReducer';
import { recenterViewReducer } from '../reducers/RecentViewREducer';
import { venuePageDirectReducer } from '../reducers/VanueDirectReducer';
import { detailPageDirectReducer } from '../reducers/DetailDirectReducer';

const store = configureStore({
    reducer: {
        VenuePageData : venuePageReducer,
        detailPage: detailPageReducer,
        recentData : recenterViewReducer,
        VenuePageDirectData : venuePageDirectReducer,
        detailpageDirect: detailPageDirectReducer
    },
});

export default store;
