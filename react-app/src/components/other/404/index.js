import { Link } from 'react-router-dom';
import notFound from '../../../images/not-found.jpg'
import './404.css'

const NotFound = () => {
    return (
        <div id='not-found-page'>
            <div id='not-found-image-div'>
                <div id='not-found-image' style={{backgroundImage: `url(${notFound})`}}>
                </div>
            </div>
            <div id='not-found-container'>
                <h1 id='not-found-title'>
                    Sorry... something got lost in translation.
                </h1>
                <div id='not-found-message'>
                    The requested resource couldn't be found.
                </div>
                <Link to='/' id='not-found-home'>
                    <button id='not-found-home-button'>
                        Home
                    </button>
                </Link>
                <div className='attribution-link-404'>
                    <a href="https://www.freepik.com/vectors/people">People vector created by jcomp - www.freepik.com</a>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
