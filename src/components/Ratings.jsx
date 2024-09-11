import React from 'react';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as starRegular} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
function Ratings(props) {

    const { voteAverage , voteCount } = props;

    const average = voteAverage / 2;

    const starArr = [...Array(5)];

    return (
        <div className='py-2 d-flex gap-2'>
            <div className='d-flex'>
                {
                
                starArr.map((item,index)=>{
                    return (
                        average > index + 1 ? 
                        <FontAwesomeIcon key={index} className="text-warning" icon={faStar} />
                        :
                        <FontAwesomeIcon key={index} icon={starRegular} />
                    )
                })
                
                }
            </div>
            <p className='mb-0'>{voteCount}</p>
        </div>
    );
}

export default Ratings;