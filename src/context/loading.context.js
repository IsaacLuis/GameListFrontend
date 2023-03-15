import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import axios from "axios";
import Games from "../pages/Games";
const API_KEY = '43a14242dd124f1fb5e0bb64b4a70da0'
const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [games, setGames] = useState(null);
  const [gamesComing,SetGamesComing] = useState(null)
  const [gamesPop,SetGamesPop] = useState(null)
  const [gamesSeries, SetGamesSeries] = useState(null)
  const [gamesParams, setGamesParams] = useState(1);
  const [page, setPage] = useState(1); // current page number
  const [page_size, setPageSize] = useState(20); // number of games per page
  const [next, setNext] = useState('')
  const [gameDetails, setGameDetails] = useState(null)
  const [gameDetailsScreen, setGameDetailsScreen] = useState(null)
  const [search, setSearch] = useState('');
  const [wish, setWish] = useState([]);


  

  const [editing, setEditing] = useState(false);


  const setTimedMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage('')
    }, 4000)
  }

  // ${API_KEY}
  // 43a14242dd124f1fb5e0bb64b4a70da0
  // games?key=<key from RAWG>

  const getGames = () => {



    if (page === 1) {
      console.log("Calling API");
      axios.get(
        `https://rawg-video-games-database.p.rapidapi.com/games?key=${API_KEY}`,
        {
          headers: {
            'X-RapidAPI-Key': '3ab9eedeeemsh37ec609bf36b9b6p1b04b2jsnc001e82699f7',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
          },
          params: { page: 1, page_size: page_size }
        }
      )
        .then((response) => {

          // let newArr = [...games];
          //newArr.push(...response.data.results)
          //   setGames(response.data.results)
          setGames(response.data.results)
          // setNext(response.data.next)
          setPage(page + 1)
          setGamesParams(response.data.next)
          console.log('page', page);
          console.log('res', response.data);
          console.log('this is the response', response)


        })
        .catch((err) => {
          console.log(err)
        })

    }





  }

  const noGame = (id) => {
    axios.get(
      `https://rawg-video-games-database.p.rapidapi.com/games/${id}?key=${API_KEY}`,
      {
        headers: {
          'X-RapidAPI-Key': '3ab9eedeeemsh37ec609bf36b9b6p1b04b2jsnc001e82699f7',
          'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        },
        params: { page: 1, page_size: page_size }
      }
    )
      .then((response) => {

        console.log("this is the found game", response.data)


        setGameDetails(response.data)



      })
      .catch((err) => {
        console.log(err)
      })
  }





  const getGameScreen = (id) => {
    axios.get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
      .then(response => {
        console.log('RESPONSE MOVIES', response.data);
        setGameDetailsScreen(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }

 
  const getGameSeries = (id) => {
    axios.get(`https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}&page_size=3`)
      .then(response => {
        console.log('RESPONSE Series', response.data.results);
        
        // const newSeries = response.data.results;
        // const updatedSeries = [...gamesSeries, ...newSeries];
        // SetGamesSeries(updatedSeries);
          SetGamesSeries(response.data.results)

      })
      .catch(error => {
        console.log(error);
      });
  } 


///games/{game_pk}/game-series

  const SearchGame = (id) => {
    axios.get(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`)
      .then(response => {
        console.log('RESPONSE Search=>>>', response.data.results);
        setGames(response.data.results)
      })
      .catch(error => {
        console.log(error);
      });
  }









  const getNewGames = () => {





    console.log("Calling API");
    axios.get(
      `https://rawg-video-games-database.p.rapidapi.com/games?key=${API_KEY}`,
      {
        headers: {
          'X-RapidAPI-Key': '3ab9eedeeemsh37ec609bf36b9b6p1b04b2jsnc001e82699f7',
          'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        },
        params: { page: page, page_size: page_size }
      }
    )
      .then((response) => {

        let newArr = [...games];
        newArr.push(...response.data.results)
        //   setGames(response.data.results)
        setGames(newArr)
        setPage(page + 1)
        // setGames((prev) => [...prev, ...response.data.results])
        //    setGamesParams(response.data.next) 
        //    console.log('page',  page);
        //     console.log('res',  response.data);
        //  console.log('this is the response', response)


      })
      .catch((err) => {
        console.log(err)
      })




  }

//Getting the Month
  const getCurrentMonth = () => {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    } else {
      return month;
    }
  };

  //Getting the date
  const getCurrentDay = () => {
    const day = new Date().getDate();
    if (day < 10) {
      return `0${day}`;
    } else {
      return day;
    }
  };
  
  //Current day/month/year
  const currentYear = new Date().getFullYear();
  const currentMonth = getCurrentMonth();
  const currentDay = getCurrentDay();
  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
  const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
  
  //Popular Games
  const popular_games = `games?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
  const upcoming_games = `games?key=${API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
  
  

  const popularGamesCall = () => {
    axios.get(`https://api.rawg.io/api/${popular_games}`)
      .then(response => {
        console.log('RESPONSE GAMES ==>', response.data);
       // setGameDetailsScreen(response.data)
       SetGamesPop(response.data.results)
      })
      .catch(error => {
        console.log(error);
      });
  }

  const upcomingGameCall = () => {
    axios.get(`https://api.rawg.io/api/${upcoming_games}`)
      .then(response => {
        console.log('RESPONSE GAMES ==>', response.data);
       // setGameDetailsScreen(response.data)
       SetGamesComing(response.data.results)
      })
      .catch(error => {
        console.log(error);
      });
  }



  // const getParams = async () => {


  //    function handleClick () {
  //     setGamesParams('next');
  //   }






  // }




  // {condition && <ConditionalComponent />}
  //{fetchQuotes && <Games data={{fetchQuotes}} />}
  return (

    <LoadingContext.Provider value={{
      isLoading, noGame, getGameScreen, page, page_size, setPage, getNewGames, gameDetails, setGameDetails,
      gameDetailsScreen, setGameDetailsScreen, gamesParams, setGamesParams, games, getGames, message, setUser,
      user, setIsLoading, setMessage, setTimedMessage, search, setSearch, SearchGame, wish, setWish,
      editing, setEditing, popularGamesCall, upcomingGameCall, SetGamesComing ,gamesComing, SetGamesPop, gamesPop,
      getGameSeries, gamesSeries 
      
    }} >
      {children}

    </LoadingContext.Provider>




  );
}

export { LoadingContext, LoadingProvider }