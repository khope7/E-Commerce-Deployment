// Importing all necessary attributes
import 'bootstrap/dist/css/bootstrap.css';

import Nav from 'react-bootstrap/Nav';


function NotFound() {
    return (

        <div className="container d-grid col col-5 g-4 py-5 border rounded mt-3 justify-content-center align-items-center bg-secondary text-warning">
            <h2>404 - Not Found</h2>
            <img src="/404NotFound.jpg" alt="404 Not Found" width={300} height={350}/>
            <h4>
                Oops! Looks like your lost traveler!
            </h4>

            <h5>
                Remember to hit the "show" button from your customer or order's list for this page to populate correctly.
            </h5>

            <h4>
                You can always go back to the homepage.
            </h4>

            <Nav>
                <Nav.Item>
                    <button className='shadow rounded bg-secondary'><Nav.Link className='notFound text-white' href='/'>Homepage</Nav.Link></button>
                </Nav.Item>
            </Nav>
        </div>
        
    )
}

export default NotFound;