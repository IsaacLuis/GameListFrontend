import { LoadingContext } from "../context/loading.context";
import { useState, useEffect } from "react";
import { useContext } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const Library = () => {
  const {
    user,
    setDetails,
    setUser,

  } = useContext(LoadingContext);

const [review,setReview] = useState('');


  { console.log('Wish in library', user) }


  useEffect(() => {

  }, [user])

  // ${baseUrl}/games/delete/add-wish/${user._id}

  const handleAddToWishlistDelete = (user, game) => {
    axios
      .post(`${baseUrl}/games/delete/add-wish/${user._id}`, { gameId: game.id })
      .then((response) => {
        console.log("Game deleted", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

const handleComment = (e) => {
  e.preventDefault()
}


  return (




    <div>
      <h1>My List</h1>
      <div className="parentLib">

        {user ? (
          <>

            <h1> {console.log('Wish in library inside', user)}</h1>

            {user.games_pick.map((game) => (
              <div className="game-card-container-lib" key={game.id}>
                <div className="game-card-lib">
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
                  <label>
                    Comment:
                    <textarea name="review" value={review} onChange={event => setReview(event.target.value)} />
                  </label>
                </div>
                <div>
                  <button className="check-button" onClick={() => handleAddToWishlistDelete(user, game)}><a className="check-button-a">Finish</a></button>
                </div>
              </div>
            ))}

          </>
        ) : (
          <p>No games found in your wishlist.</p>
        )}
      </div>
    </div>

  );
};


export default Library