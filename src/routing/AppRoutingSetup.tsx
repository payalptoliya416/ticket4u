import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { DefaultPage, Demo1DarkSidebarPage } from '@/pages/dashboards';
import { NetworkUserTableTeamCrewPage,AddUser} from '@/pages/network';
import {ResetPasswordChange} from '@/auth/pages/jwt/reset-password';
import {OrganiserPage,AddOrganiser} from '@/pages/organiser';
import {CategoryPage,AddCategory} from '@/pages/category';
import {SubCategoryPage,AddSubCategory} from '@/pages/sub-category';
import {EventPage,AddEvent, EventDetail} from '@/pages/event';
import {VenuePage,AddVenue,AddChart} from '@/pages/venue';
import { ActivityPage } from '@/pages/activity/ActivityPage';
import {SliderPage,AddSlider} from '@/pages/home-page/slider';
import {AdvertisementBannerPage,AddAdvertisementBanner} from '@/pages/home-page/advertisement-banner';
import {PromotionalBannerPage, AddPromotionalBanner} from '@/pages/home-page/promotional-banner';
import {EventDetailBannerPage, AddEventDetailBanner} from '@/pages/home-page/event-detail-banner';
import {AmenitiePage,AddAmenitie} from '@/pages/amenitie';
import {BookingPage} from '@/pages/booking';
import {CustomerPage} from '@/pages/customer';

import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { Demo1Layout } from '@/layouts/demo1';
import { ErrorsRouting } from '@/errors';
import { HeroSecPage } from '@/pages/herosection/HeroSecPage';
import { AddheroSection } from '@/pages/herosection/AddHeroSection';

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Demo1Layout />}>
          <Route path="/dashboard" element={<DefaultPage />} />
          <Route path="/dark-sidebar" element={<Demo1DarkSidebarPage />} />

          {/* User */}
          <Route path="/user-table/user-list" element={<NetworkUserTableTeamCrewPage />} />
          <Route path="/add-user" element={<AddUser />} /> {/* Add User Route */}
          {/* / User  */}

          {/* Organiser */}
          <Route path="/organiser-table/organiser-list" element={<OrganiserPage />} />
          <Route path="/add-organiser" element={<AddOrganiser />} />
          {/* / Organiser */}

          {/* Category */}
          <Route path="/category-table/category-list" element={<CategoryPage />} />
          <Route path="/add-category" element={<AddCategory />} />
          {/* / Category */}

          {/* Sub Category */}
          <Route path="/sub-category-table/sub-category-list" element={<SubCategoryPage />} />
          <Route path="/add-sub-category" element={<AddSubCategory />} />
          {/* / Sub Category */}

          {/* Venues */}
          <Route path="/Venues-table/Venues-list" element={<VenuePage />} />
          <Route path="/add-Venues" element={<AddVenue />} />
          <Route path="/add-Chart" element={<AddChart />} />
          {/* Venues */}

          {/* Event */}
          <Route path="/event-table/event-list" element={<EventPage />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/event-Detail" element={<EventDetail />} />
          {/* / Event */}

          {/* Booking */}
          <Route path="/booking-table/booking-list" element={<BookingPage />} />
          {/* <Route path="/add-amenities" element={<AddAmenitie />} /> */}
          {/* Booking */}

          {/* Customer */}
          <Route path="/customer-table/customer-list" element={<CustomerPage />} />
          {/* <Route path="/add-amenities" element={<AddAmenitie />} /> */}
          {/* Customer */}

          {/* Amenities */}
          <Route path="/amenities-table/amenities-list" element={<AmenitiePage />} />
          <Route path="/add-amenities" element={<AddAmenitie />} />
          {/* / Amenities */}

          {/* Herosection */}
          <Route path="/herosec-table/herosec-list" element={<HeroSecPage />} />
          <Route path="/add-herosection" element={<AddheroSection />} />
          {/* / Herosection */}

          <Route path="/activity-table/activity-list" element={<ActivityPage />} />

          {/* other routes */}
          <Route path="/change-password" element={<ResetPasswordChange />} />
          {/* other routes */}

          {/* Home page */}
          <Route path="/slider-table/slider-list" element={<SliderPage />} />
          <Route path="/add-slider" element={<AddSlider />} />

          <Route path="/advertisement-banner-table/advertisement-banner-list" element={<AdvertisementBannerPage />} />
          <Route path="/add-advertisement-banner" element={<AddAdvertisementBanner />} />

          <Route path="/promotional-banner-table/promotional-banner-list" element={<PromotionalBannerPage />} />
          <Route path="/add-promotional-banner" element={<AddPromotionalBanner />} />

          <Route path="/event-detail-banner-table/event-detail-banner-list" element={<EventDetailBannerPage />} />
          <Route path="/add-event-detail-banner" element={<AddEventDetailBanner />} />
          {/* / Home page */}
          
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="/*" element={<AuthPage />} />  
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
