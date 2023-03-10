

import { useEffect, createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { LoadingContext } from "../context/loading.context"
import PopularGames from "./PoularGames";
import Upcoming from "./UpcomingGames";


const Home = () => {

    const {  games, popularGamesCall, setDetails}
        = useContext(LoadingContext)

 


    
  return (
    <div> 
   <PopularGames/>  
    <Upcoming/>
    </div>
  )

}

export default Home