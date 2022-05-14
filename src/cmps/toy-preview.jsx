

import {Link} from 'react-router-dom'
import { toyService } from '../services/toy.service'
import Train from "../assets/img/Train.jpg"
import Toy_Bricks from "../assets/img/Toy_Bricks.jpg"
import Teddy_Bear from "../assets/img/Teddy_Bear.jpg"
import Toy_Truck from "../assets/img/Toy_Truck.jpg"
import SuperMan from '../assets/img/SuperMan.jpg'
import Super_Mario from '../assets/img/Super_Mario.jpg'
import Stuffed_Monkey from '../assets/img/Stuffed_Monkey.jpg'
import Robot from '../assets/img/Robot.jpg'
import Rabit_Toy from '../assets/img/Rabit_Toy.jpg'
import defaultImage from '../assets/img/1.png'

export function ToyPreview({ toy, onRemoveToy }) {
    const isDone = (toy.status === 'done') ? 'line-through' : 'none'
    console.log('toy from preview', toy)
    return (        
        <li className="toy-preview">
            <h4 style={{ textDecoration: isDone }}>{toy.name}</h4>
            <p className="toy-price">Price: <span>{toy.price}</span></p>
            <p className="toy-labels">Labels: <span>{toy.labels.selectedOption.map((label,idx) => {
                return (idx === toy.labels.selectedOption.length-1) ? label : label+', '
            } )}</span></p>
            {toy.name === 'Train' && <img className='card-image' src={Train} alt="img of train"/>}
            {toy.name === 'Robot' && <img className='card-image' src={Robot} alt="img of Robot"/>}
            {toy.name === 'Stuffed_Monkey' && <img className='card-image' src={Stuffed_Monkey} alt="img of train"/>}
            <img src={toy.img || defaultImage} alt="a Toy"/>
            <div>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
                <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
            </div>
        </li>

    )
}