

import { useEffect, createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { LoadingContext } from "../context/loading.context"



const Upcoming = () => {

    const {  gamesComing, upcomingGameCall, setDetails}
        = useContext(LoadingContext)

        useEffect(() => {
            
                
            upcomingGameCall()
            
        
          }, []) 


    
  return (
    <div>
        <hr></hr>
       <h1>New games</h1>
    <div className="parentImg">
     
      <br />
      
      {gamesComing ?
        <>
          {gamesComing.map((game) => {


            return (

              <>

                {/* {game &&  */}
                <div className="game-card-container" key={game.id}>
                  <div className="game-card">
                     <Link onClick={() => setDetails(game)} to={`/games/${game.id}`}>
                      <img src={game.background_image} alt="Gameimg" />
                    </Link> 
                    <h2>{game.name}</h2>
                    <ul>
                      {game.genres.length && (
                        <li>
                          <strong>Genre </strong> {game.genres[0].name}
                        </li>
                      )}
                      <li>
                        <strong>Rating </strong>
                        {game.rating}
                      </li>
                      {game.esrb_rating ?
                        <li>
                          <strong>ESRB Rating </strong>
                          {game.esrb_rating.name}
                        </li>
                        :
                        <li>
                          <strong>ESRB Rating </strong>
                          No Rating
                        </li>
                      }
                      <li>
                        <strong>Playtime </strong>
                        {game.playtime} hrs
                      </li>
                      <li>
                        <strong>Released: </strong>
                        {game.released}
                      </li>
                    </ul>
                  </div>
                </div>
                {/* } */}
              </>
            );
          }
          )}
        </>
        :
        <h4>Loading...</h4>
      }

      
    </div>
    </div>
  );

}

export default Upcoming