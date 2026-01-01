import './cardSidebar.css'
import { Link } from 'react-router';

export default function CardSidebarChildren({titulo, img, path, setter}){
    return(
        <Link 
            to={path}
            className="cardSidebarChildren"
            onClick={() => {setter(ant => !ant)}}
        >
            <img className="imgCardSidebar" src={img} alt=""/>
            <p className="titleCardSidebar">{titulo}</p>
        </Link>
    );
}