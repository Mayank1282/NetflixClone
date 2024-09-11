import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import axios from "../utility/axios";
import Row from "../components/Row";
import {
  fetchNetflixOrignals,
  selectNetflixOrignals,
} from "../features/counter/tv/tvSlice";
import {
  fetchNowPlayingMovies,
  selectNowPalyingMovies,
} from "../features/counter/movie/movieSlice";
import { requests } from "../utility/apirequests";
import { shuffle } from "../utility/helper";

function Browse(props) {
  const param = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const collection = useSelector(
    param.platform === "tv" ? selectNetflixOrignals : selectNowPalyingMovies
  );

  const { data, error, status } = collection;

  const random = Math.floor(Math.random() * data?.results.length);

  const [genreList, setGenreList] = useState(null);

  useEffect(() => {
    if (param.platform === "tv") {
      dispatch(fetchNetflixOrignals());
    } else if (param.platform === "movie") {
      dispatch(fetchNowPlayingMovies());
    } else {
      navigate("/browse/tv");
    }
  }, [param]);

  const fetchGenreList = async (type) => {
    const response = await axios.get(requests.getGenreList(type));
    // Shuffle your array here //
    const shuffled_arr = shuffle(response.data.genres);
    setGenreList(shuffled_arr);
  };

  useEffect(() => {
    if (param) {
      setGenreList(null);
      fetchGenreList(param.platform);
    }
  }, [param]);

  return (
    <>
      {<Header video={data?.results[random]} platform={param.platform} />}
      <div className="container-fluid">
        {genreList
          ? genreList.map((genre) => {
              return (
                <Row
                  isGenre={true}
                  title={genre.name}
                  platform={param.platform}
                  genreId={genre.id}
                />
              );
            })
          : ""}
      </div>
    </>
  );
}

export default Browse;
