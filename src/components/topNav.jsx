import Nav from 'react-bootstrap/Nav';
import { BsPerson } from 'react-icons/bs';

function TopNav(pageName) {
    return (
        <Nav defaultActiveKey="/" as="ul">
            <h2>{pageName}</h2>
            {/* <Nav.Item as="li">
            <Nav.Link href="/Home">Home</Nav.Link>
        </Nav.Item>
        <h2 >l</h2> */}
            <Nav.Item as="li">
                <Nav.Link href="/Teamup">組隊</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/Vote">投票</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/View">景點</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/Query">問卷</Nav.Link>
            </Nav.Item>
            <h2 >l</h2>
            <Nav.Item as="li">
                <Nav.Link href="/Schedule">行程</Nav.Link>
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
export default TopNav;