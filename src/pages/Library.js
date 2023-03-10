import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { post } from "../services/authService";

const Library = () => {
  const { user, setDetails, setUser } = useContext(LoadingContext);
  const { authenticateUser } = useContext(AuthContext);
  const [review, setReview] = useState("");

  {
    console.log("Wish in library", user);
  }

  useEffect(() => {
    // authenticateUser();
  }, [user]);

  console.log(user);
  // ${baseUrl}/games/delete/add-wish/${user._id}

  const handleAddToWishlistDelete = (user, game) => {
    console.log(game);
    axios
      .post(`${baseUrl}/games/delete/add-wish/${user._id}`, { gameId: game })
      .then((response) => {
        console.log("Game deleted", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // console.log(
  //   user.games_pick.map((game) => {
  //     console.log(game);
  //   })
  // );

  const handleCommentSubmit = (gameId) => {
    // user.games_pick.forEach((game) => {
    //   if (game.id === gameId) {
    post(`/games/reviews/${gameId}/${user._id}`, { review })
      .then((results) => {
        console.log(results.data);
        setUser(results.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // });
  };
  console.log(user);
  return (
    <div className="library-container">
    <h1>My List</h1>
    <div className="parentLib">
      {user ? (
        <>
          {user.games_pick.map((game) => (
            <div className="game-card-container-lib" key={game.id}>
              <div className="game-card-lib">
                <Link
                  onClick={() => setDetails(game)}
                  to={`/games/${game.id}`}
                >
                  <img src={game.background_image} alt="Gameimg" />
                </Link>
                <div className="game-info">
                  <h2>{game.name}</h2>
                  <ul>
                    <li>
                      <strong>Rating:</strong> {game.metacritic}
                    </li>
                    <li>
                      <strong>Released:</strong> {game.released}
                    </li>
                  </ul>
                  {game.review && (
                    <div className="game-review">
                      <strong>Comment:</strong> {game.review.comment}
                    </div>
                  )}
                  <form
                    className="game-comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommentSubmit(game._id);
                    }}
                  >
                    <label>
                      Comment:
                      <textarea
                        name="review"
                        onChange={(event) => setReview(event.target.value)}
                      />
                    </label>
                    <button>Comment</button>
                  </form>
                </div>
                <button
                  className="check-button"
                  onClick={() => handleAddToWishlistDelete(user, game.id)}
                >
                  <span className="check-button-text">Finish</span>
                </button>
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

export default Library; 