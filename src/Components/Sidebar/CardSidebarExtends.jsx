import './cardSidebar.css'

export default function CardSidebarExtends({setter, img, titulo}){
    return(
        <button
            className="cardSidebarExtends"
            onClick={() => {setter(ant => !ant)}}
        >
            
            <img className="imgCardSidebar" src={img} alt=""/>
            <p className="titleCardSidebar">{titulo}</p>
        </button>
    );
}