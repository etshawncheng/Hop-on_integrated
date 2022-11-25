import Nav from 'react-bootstrap/Nav';
import { BsPerson } from 'react-icons/bs';
import Taipei from './assets/taipei-101.jpg'
import Taichung from './assets/taichung.jpg'
import Taitung from './assets/taitung.jpg'
import Tainan from './assets/台南_OG圖_shelly.jpg'
import Hualien from './assets/hualien.jpg'
import Kaohsiung from './assets/koahsuing.jpg'
import './views.css'
import TopNav from '../components/topNav';
//////////////////////////////////////////////////////////////////////////上面 JS 

export default function Views() {
  return (
    <main style={{ padding: "1rem 0" }}>
      {TopNav("Teamup")}

      {/* <div name='views' className='selects'>
            <div className='container'>
                <img bgImg={Taipei} text='Taipei' />
                <img bgImg={Taichung} text='Taichung' />
                <img bgImg={Taitung} text='Taitung' />
                <img bgImg={Tainan} text='Tainan' />
                <img bgImg={Hualien} text='Hualien' />
                <img bgImg={Kaohsiung} text='Kaohsiung' />
            </div>
        </div> */}

      {/*--------------------------------------------------------------------------------  */}


      <div class="container1">
        <h3 >Taipei</h3>
        <h3 >l</h3>
        <h3 >Taichung</h3>
        <h3 >l</h3>
        <h3 >Taitung</h3>
        <h3 >l</h3>
        <h3 >Tainan</h3>
        <h3 >l</h3>
        <h3 >Hualien</h3>
        <h3 >l</h3>
        <h3 >Kaohsiung</h3>



      </div>

      {/* --------------------------- */}
      <div class="container">

        <img src={Taipei} text="Taipei" ></img>
        {/* <h3 class="centered"/>Taipei */}

        <img src={Taichung} text="Taichung" ></img>
        {/* <h3 class="centered"/>Taichung */}

        <img src={Taitung} text="Taitung"></img>
        <img src={Tainan} text="Tainan"></img>
        <img src={Hualien} text="Hualien"></img>
        <img src={Kaohsiung} text="Kaohsiung"></img>



        {/* <div class="bottom-left">Bottom Left</div>
  <div class="top-left">Top Left</div>
  <div class="top-right">Top Right</div>
  <div class="bottom-right">Bottom Right</div>
  <div class="centered">Centered</div> */}

      </div>



      {/*--------------------------------------------------------------------------------  */}
      {/* <div class="gallery">
  <a target="_blank" href="C:\Users\user\Downloads\hop-on-master\hop-on-master\client-side\src\routes\assets\taipei-101.jpg">
    <img src="C:\Users\user\Downloads\hop-on-master\hop-on-master\client-side\src\routes\assets\taipei-101.jpg" alt="Taipei" width="600" height="400"></img>
  </a>
  <div class="desc">Taipei</div>
</div>

<div class="gallery">
  <a target="_blank" href="img_forest.jpg">
    <img src="img_forest.jpg" alt="Forest" width="600" height="400"></img>
  </a>
  <div class="desc">Add a description of the image here</div>
</div>

<div class="gallery">
  <a target="_blank" href="img_lights.jpg">
    <img src="img_lights.jpg" alt="Northern Lights" width="600" height="400"></img>
  </a>
  <div class="desc">Add a description of the image here</div>
</div>

<div class="gallery">
  <a target="_blank" href="img_mountains.jpg">
    <img src="img_mountains.jpg" alt="Mountains" width="600" height="400"></img>
  </a>
  <div class="desc">Add a description of the image here</div>
</div> */}

      {/* -------------------------------------------------------------------------------- */}

      <div class="full-page" id="tinder">tinder



        <div class="d-grid">
          <button class="btn btn-primary" type="submit" href="/Tinder">
            <Nav.Link href="/Tinder">Tinder card</Nav.Link>
          </button>
        </div>



      </div>


    </main>
  );
}