import React from 'react';
import { Link } from 'react-router-dom';

function Genre(props) {
    const { genreList, platform } = props;
    return (
        <div className='d-flex gap-2'>
            {
                genreList?.map((genre) => {
                    return (
                        <Link key={genre.id} to={`/browsebygenre/${platform}/${genre.id}`} class="badge text-bg-warning">{genre?.name}</Link>
                    )
                })
            }
        </div>
    );
}

export default Genre;