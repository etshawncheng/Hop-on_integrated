import Nav from 'react-bootstrap/Nav';
import { BsPerson } from 'react-icons/bs';

export default function TopNav(pageName) {
    return (<Nav defaultActiveKey="/" as="ul">
        <h2>{pageName}</h2>
        {/* <Nav.Item as="li">
            <Nav.Link href="/Home">Home</Nav.Link>
        </Nav.Item>
        <h2 >l</h2> */}
        <Nav.Item as="li">
            <Nav.Link href="/Teamup">Team up</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
        <Nav.Item as="li">
            <Nav.Link href="/Votes">Vote</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
        <Nav.Item as="li">
            <Nav.Link href="/views">Views</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
        <Nav.Item as="li">
            <Nav.Link href="/Schedule">Schedule</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>

        <div className="nav-icons">
            <Nav.Item as="li">
                <Nav.Link href="/Member">
                    <BsPerson className='icon' herf="/Member" smooth={true} duration={500} ></BsPerson>
                </Nav.Link>
            </Nav.Item>

        </div>
    </Nav>)
};