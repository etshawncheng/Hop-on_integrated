import Nav from 'react-bootstrap/Nav';
import { BsPerson } from 'react-icons/bs';

export default function TopNav(pageName, user_id, team_id) {
    console.debug(user_id, team_id)
    return (<Nav defaultActiveKey="/" as="ul">
        <h2>{pageName}</h2>
        {/* <Nav.Item as="li">
            <Nav.Link href="/Home">Home</Nav.Link>
        </Nav.Item>
        <h2 >l</h2> */}
        <Nav.Item as="li">
            <Nav.Link href="/Teamup" state={{ user_id: user_id, team_id: team_id }}>Team up</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
        <Nav.Item as="li">
            <Nav.Link href="/Votes" state={{ user_id: user_id, team_id: team_id }}>Vote</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
        <Nav.Item as="li">
            <Nav.Link href="/views" state={{ user_id: user_id, team_id: team_id }}>Views</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
        <Nav.Item as="li">
            <Nav.Link href="/Schedule" state={{ user_id: user_id, team_id: team_id }}>Schedule</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>

        <div className="nav-icons">
            <Nav.Item as="li">
                <Nav.Link href="/Member" state={{ user_id: user_id, team_id: team_id }}>
                    <BsPerson className='icon' herf="/Member" smooth={true} duration={500} ></BsPerson>
                </Nav.Link>
            </Nav.Item>

        </div>
    </Nav>)
};