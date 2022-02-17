import { Link } from 'react-router-dom';

const Notfound = () => {
    return (
        <div>
            This page not found <Link to="/">Home</Link>
        </div>
    )
}

export {Notfound}