import Nav from 'react-bootstrap/Nav';
import { BsPerson } from 'react-icons/bs';
import Video from './assets/Sunrise - 74704.mp4'
import {AiOutlineSearch, AiOutlineSend} from 'react-icons/ai'
import './Home.css'

export default function Home() {
    return (
      <main style={{ padding: "1rem 0" }}>
        
      <Nav defaultActiveKey="/" as="ul">

      {/* ------------------------------------------------------------------------- */}
        
      <h2>Hop On</h2>  
        <Nav.Item  className="Nav.Item"   as="li">
      <Nav.Link href="/Home">Home</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
      <Nav.Item className="Nav.Item" as="li">
        <Nav.Link href="/Teamup">Team up</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
      <Nav.Item className="Nav.Item" as="li">
        <Nav.Link href="/Vote">Vote</Nav.Link>
      </Nav.Item>
      <h2 >l</h2>
        <Nav.Item className="Nav.Item" as="li">
      <Nav.Link href="/views">Views</Nav.Link>
        </Nav.Item>
        <h2 >l</h2>
        <Nav.Item className="Nav.Item" as="li">
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
      
      
      </Nav>


      <div className='Home'>
      <video autoPlay loop muted id='video'>
                <source src={Video} type='video/mp4' />
            </video>
      
            <div className="overlay"></div>
            <div className="content">
                <h1>Wanna travel with us? Hop on !</h1>
                <h2>Simple three steps to start</h2>
                
                    {/* <div>
                        <input type="text" placeholder='Search Destinations' />
                    </div> */}
                    <div>
                        

                        <div>
                
                <button class="btn btn-primary" type="submit" onclick="myFunction()" Link="/Member">Let's go !

                    <AiOutlineSend className='icon'href="/Member" /> 
                           
                        
                        </button>
            </div> 


                    </div>
                
            </div>
            </div>




      </main>
    );
  }