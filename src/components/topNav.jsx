import Nav from 'react-bootstrap/Nav';
import { BsPerson } from 'react-icons/bs';

function TopNav(pageName, navigate) {
    return (
        <Nav defaultActiveKey="/" as="ul">
            <h2>{pageName}</h2>
            {/* <Nav.Item as="li">
            <Nav.Link href="/Home">Home</Nav.Link>
        </Nav.Item>
        <h2 >l</h2> */}
            <Nav.Item as="li">
                <Nav.Link href="/Teamup" onClick={e => { navigate("/Teamup") }}>Team up</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/Vote" onClick={e => { navigate("/Vote") }}>Vote</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/View" onClick={e => { navigate("/View") }}>Views</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/Query" onClick={e => { navigate("/Query") }}>Query</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/Schedule" onClick={e => { navigate("/Schedule") }}>Schedule</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <div className="nav-icons">
                <Nav.Item as="li">
                    <Nav.Link href="/Member" onClick={e => { navigate("/Member") }}>
                        <BsPerson className='icon' herf="/Member" smooth={true} duration={500} ></BsPerson>
                    </Nav.Link>
                </Nav.Item>
            </div>
        </Nav>)
};
export default TopNav;