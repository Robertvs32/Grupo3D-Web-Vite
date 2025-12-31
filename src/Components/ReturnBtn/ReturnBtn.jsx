import { Link } from "react-router";
import returnIcon from '../../assets/img/return.png';
import './returnBtn.css'

export default function ReturnBtn({path}){
    return(
        <div id="returnBtn">
            <Link 
                id="linkBtn"
                to={path}
            >
                <img src={returnIcon} alt="botao de retornar" />
            </Link>
        </div>
    )
}