import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoDetails } from "../features/counter/common/commonSlice";
import Ratings from "./Ratings";

function Card(props) {
  const { video, isPoster, platform } = props;

  const dispatch = useDispatch();

  const showDetails = () => {
    dispatch(fetchVideoDetails({ platform: platform, id: video.id }));
  };

  return (
    <div
      className="card text-white"
      data-bs-toggle="modal"
      data-bs-target="#details-modal"
      onClick={showDetails}
    >
      <img
        className="card-img-top"
        src={`https://image.tmdb.org/t/p/original${
          isPoster ? video?.poster_path : video?.backdrop_path
        }`}
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">
          {video?.name ||
            video?.original_name ||
            video?.title ||
            video?.original_title}
        </h5>
        <Ratings voteAverage={video?.vote_average} voteCount={video?.vote_count} />
      </div>
    </div>
  );
}

export default Card;
