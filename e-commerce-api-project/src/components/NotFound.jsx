// Importing all necessary attributes
import 'bootstrap/dist/css/bootstrap.css';

import Nav from 'react-bootstrap/Nav';


function NotFound() {
    return (

        <div className="container d-grid col col-5 g-4 py-5 border rounded mt-3 justify-content-center align-items-center bg-secondary text-warning">
            <h2>404 - Not Found</h2>
            <img src="../src/assets/404NotFound.avif" alt="404-avif" width={300} height={350}/>
            <p>Oops! Looks like your lost traveler!</p>
            <p>
                You can always go back to the homepage.
            </p>
                <Nav>
                    <Nav.Item>
                        <button className='shadow rounded bg-secondary'><Nav.Link className='notFound text-white' href='/'>Homepage</Nav.Link></button>
                    </Nav.Item>
                </Nav>
        </div>
        
    )
}

export default NotFound;