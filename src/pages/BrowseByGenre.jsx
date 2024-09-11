import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utility/axios";
import { requests } from "../utility/apirequests";
import Card from "../components/Card";

function BrowseByGenre(props) {
  const initialOption = "disable";
  const [genreData, setGenreData] = useState(null);
  const [genreList, setGenreList] = useState(null);
  const [currentType, setCurrentType] = useState("tv");
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const param = useParams();

  const fetchVideosByGenre = async (type, id) => {
    const response = await axios.get(requests.getByGenre(type, id));
    setGenreData(response.data);
  };

  useEffect(() => {
    if (param) {
      fetchVideosByGenre(param.platform, param.id);
    }
  }, [param]);

  const fetchGenreList = async (type) => {
    const response = await axios.get(requests.getGenreList(type));
    setGenreList(response.data.genres);
  };

  const handleType = (e) => {
    const { value } = e.target;
    setGenreData(null);
    setSelectedOption(initialOption)
    fetchGenreList(value);
    setCurrentType(value);
  };

  const handleGenre = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
    fetchVideosByGenre(currentType, value);
  };

  return (
    <div className="container-fluid py-5">
      <div className="d-flex py-4 gx-3 justify-content-end">
        <p>Filter by</p>
        <select
          className="form-select w-auto ms-2"
          onChange={handleType}
          defaultValue="disable"
        >
          <option disabled value="disable">
            Select Platform
          </option>
          <option value="tv">Tv</option>
          <option value="movie">Movie</option>
        </select>

        <select
          className="form-select w-auto ms-2"
          onChange={handleGenre}
          value={selectedOption}
        >
          <option disabled value="disable">
            Select Genre
          </option>
          {genreList?.map((genre) => (
            <option key={genre?.id} value={genre?.id}>
              {genre?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row g-3">
        {genreData?.results.map((video) => (
          <div key={video.id} className="col-md-3">
            <Card video={video} platform={param.platform} />
          </div>
        ))}
      </div>

    {/* Bootstrap Pagination */}

     <br></br>

      {/* <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav> */}

      {/* ------------------------------ */}
    </div>
  );
}

export default BrowseByGenre;
