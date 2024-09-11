import { React, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utility/axios";
import Card from "./Card";
import { requests } from "../utility/apirequests";

function Row(props) {
  const { title, action, selector, isPoster, platform, isGenre, genreId } =
    props;

  const collection = useSelector(!isGenre ? selector : () => {});

  const dispatch = useDispatch();

  const [genreData, setGenreData] = useState(null);

  useEffect(() => {
    if (isGenre) {
      fetchVideosByGenre(platform, genreId)
    }
}, [isGenre])

  useEffect(() => {
    if (!isGenre) {
      dispatch(action());
    } 
  }, [isGenre]);


  const fetchVideosByGenre = async (platform, id) => {
    const response = await axios.get(requests.getByGenre(platform, id));
    setGenreData(response.data?.results);
  };

  return (
    <div className="text-white py-4">
      <h3 className="mb-3">{title}</h3>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        modules={[Navigation]}
        navigation
      >
        {isGenre
          ? genreData?.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Card video={movie} isPoster={isPoster} platform={platform} />
              </SwiperSlide>
            );
          })
          :collection.data?.results.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <Card video={movie} isPoster={isPoster} platform={platform} />
                </SwiperSlide>
              );
            })
          }
      </Swiper>
    </div>
  );
}

export default Row;

// we use swiper here and imported its css etc.
//we get the collections by going to tmdb doc and then discover
