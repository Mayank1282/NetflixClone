import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHeaderVideos,
  fetchVideoDetails,
  selectHeaderVideo,
} from "../features/counter/common/commonSlice";

import { formatDate, truncate } from "../utility/helper";
import VideoPlayer from "./VideoPlayer";
import Genre from "./Genre";

function Header(props) {
  const { video, platform } = props;

  const dispatch = useDispatch();

  const { data, status, error } = useSelector(selectHeaderVideo);

  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (video) {
      dispatch(
        fetchHeaderVideos({
          platform: platform ? platform : "tv",
          id: video.id,
        })
      );
    }
  }, [video]);

  const PlayTrailer = () => {
    setIsPlay(true);
  };

  const showDetails = () => {
    dispatch(fetchVideoDetails({ platform: platform ? platform : "tv", id: video?.id }));
  };

  return (
    <div className="position-relative vh-100">
      {!isPlay ? (
        <>
          <img
            className="header-img"
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt=""
          />

          <div className="caption">
            <h1 className="title display-2">
              {data?.name ||
                data?.original_name ||
                data?.title ||
                data?.original_title}
            </h1>
            <span className="title display-2">
              {data?.tagline
                ? data?.tagline !== ""
                  ? " (" + data?.tagline + " )"
                  : ""
                : ""}
            </span>
            <></> 
            <p className="fs-5">{truncate(data?.overview, 120)}</p>
            <Genre genreList={data?.genres} platform={platform} />
            <p className="fs-5">
              {data?.first_air_date
                ? "Release Date :-" + formatDate(data?.first_air_date)
                : ""}
            </p>
            <Ratings
              voteAverage={data?.vote_average}
              voteCount={data?.vote_count}
            />
            <button
              className="btn btn-warning me-2"
              onClick={showDetails}
              data-bs-toggle="model"
              data-bs-target="#details-model"
            >
              More Info
            </button>
            <button className="btn btn-info" onClick={PlayTrailer}>
              Play
            </button>
          </div>
        </>
      ) : (
        <VideoPlayer videoList={data?.videos?.results} isHeader={setIsPlay} />
      )}
      <div className="header-vignette"></div>
      <div className="header-bottom-vignette"></div>
    </div>
  );
}

export default Header;
