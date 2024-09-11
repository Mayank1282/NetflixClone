// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

function VideoPlayer(props) {
  const { videoList, isHeader } = props;

  const [key, setKey] = useState(null);

  // const VideoState = () => {
  //   return isHeader(false);
  // };

  useEffect(() => {
    if (videoList) {
      const filter = videoList.find((item) => {
        return item.type === "Trailer";
      });
      setKey(filter);
    }
  }, [videoList]);

  return (
    <div
      className={`ratio ratio-16x9 youtube-player ${isHeader ? "vh-100" : ""}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${key?.key}?rel=0&autoplay=1&mute=1`}
        title={`${key?.name}`}
        allowFullScreen
      ></iframe>
      {/* {isHeader ? 
      <FontAwesomeIcon
        className="btn close-icon"
        icon={faCircleXmark}
        onClick={VideoState}
      />
      : ""
    } */}
    </div>
  );
}

export default VideoPlayer;
