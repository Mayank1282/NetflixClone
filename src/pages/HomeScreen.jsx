import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNetflixOrignals,
  selectNetflixOrignals,
} from "../features/counter/tv/tvSlice";
import Header from "../components/Header";
import Row from "../components/Row";
import {
  fetchNowPlayingMovies,
  selectNowPalyingMovies,
} from "../features/counter/movie/movieSlice";
import { platformType } from "../utility/apirequests";

function HomeScreen(props) {
  const dispatch = useDispatch();

  const nfOrignals = useSelector(selectNetflixOrignals);

  const { status, data, error } = nfOrignals;

  const random = Math.floor(Math.random() * data?.results.length);

  useEffect(() => {
    dispatch(fetchNetflixOrignals());
  }, [dispatch]);

  return (
    <>
      {data ? <Header video={data?.results[random]} /> : "No Data"}

      <div className="container-fluid">
        
        <Row
          title="Now Playing Movies"
          action={fetchNowPlayingMovies}
          selector={selectNowPalyingMovies}
          platform={platformType.movie}
          isPoster={true}
        />

        <Row
          title="Netflix Orignals"
          action={fetchNetflixOrignals}
          selector={selectNetflixOrignals}
          platform={platformType.tv}
        />

      </div>
    </>
  );
}

export default HomeScreen;
