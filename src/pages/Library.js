import { LoadingContext } from "../context/loading.context";
import { useState, useEffect } from "react";
import { useContext} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const Library = () => {
    const {
        user, 
        setDetails,
        setUser,
        
    } = useContext(LoadingContext);

    {console.log('Wish in library', user)}
    

    useEffect(()=>{
      
    },[user])


    const handleAddToWishlistDelete = (user, game) => {
      axios.post(`http://localhost:4000/games/delete/add-wish/${user._id}`, { game: game })
        .then((response) => {
          console.log('Game deleted', response.data);
          setUser(response.data)
        })
        .catch((error) => {
          console.log(error.message);
        });
      };

    return (
        
        <div className="parentLib">
            
          {user  ? (
            <>
              <h1> {console.log('Wish in library inside', user)}</h1>
              
               {user.games_pick.map((game) => (
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
                  <button onClick={() => handleAddToWishlistDelete(user, game)}>Delete</button>
                </div>
              ))}
          
            </>
          ) : (
            <p>No games found in your wishlist.</p>
          )}
        </div>
      );
    };


export default Library