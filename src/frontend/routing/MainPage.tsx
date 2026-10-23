import React from 'react'
import LandingPage from '../component/landingpage/LandingPage'
import HeroSection from '../component/landingpage/HeroSection'
import TopEventTicket from '../component/landingpage/TopEventTicket'
import Poster from '../component/landingpage/Poster'
import TopArtist from '../component/landingpage/TopArtist'
import HighlightOfWeek from '../component/landingpage/HighlightOfWeek'
import RecommandMovie from '../component/landingpage/RecommandMovie'
import City from '../component/landingpage/City'
import LiveEvent from '../component/landingpage/LiveEvent'
import Premieres from '../component/landingpage/Premieres'
import Banner from '../component/landingpage/Banner'
import TopEvents from '../component/landingpage/TopEvents'
import Ticketes from '../component/landingpage/Ticketes'
import Footer from '../component/landingpage/Footer'
import { Container } from '@/components'
import Football from '../component/landingpage/football'

function MainPage() {
  return (
    <>
    <div style={{fontFamily: 'CircularSpotifyTxT'}} >
       <Container>
      <LandingPage/>
       </Container>
      <HeroSection/>
      <TopEventTicket/>
      <Poster/>
      <TopArtist/>
      {/* <HighlightOfWeek/> */}
      {/* <RecommandMovie/> */}
      <City/>
      <LiveEvent/>
      <Premieres/>
      <Football/>
      <Banner/>
      {/* <TopEvents/> */}
      <Ticketes/> 
      <Footer/>
    </div>
    </>
  )
}

export default MainPage
