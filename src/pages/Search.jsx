import React, { useEffect, useState } from 'react';
import { requests } from '../utility/apirequests';
import { useSelector } from 'react-redux';
import { selectSearchString } from '../features/counter/common/commonSlice';
import axios from '../utility/axios';
import Card from '../components/Card';

function Search(props) {
    const query = useSelector(selectSearchString);
    const [searchData, setSearchData] = useState(null);

    const fetchSearchVideo = async (type, query) => {
        const response = await axios.get(requests.getSearch(type, query));
        setSearchData(response.data.results);
    }

    useEffect(() => {
        if (query !== "") {
            fetchSearchVideo("multi", query);
        }
    }, [query])

    return (
        <div className='container-fluid py-5'>
            <div className='row g-3'>
                {
                    searchData?.map((video) => (
                        <div key={video.id} className='col-md-3'>
                            <Card video={video} platform={video.media_type} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Search;
