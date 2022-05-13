
import {Link} from 'react-router-dom'
import { toyService } from '../services/toy.service'

export function ToyPreview({ toy, onRemoveToy, onSetDone }) {
    const isDone = (toy.status === 'done') ? 'line-through' : 'none'
    return (
        <li className="toy-preview">
            <h4 onClick={() => onSetDone(toy)} style={{ textDecoration: isDone }}>{toy.name}</h4>
            <p className="toy-price">Price: <span>{toy.price}</span></p>
            <p className="toy-labels">Labels: <span>{toy.labels.map((label,idx) => {
                return (idx === toy.labels.length-1) ? label : label+', '
            } )}</span></p>
            <div>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
                <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
            </div>
        </li>

    )
}