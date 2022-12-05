import './Member.css'
import TopNav from '../components/topNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
export function Member() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
  }, [])
  return (
    <main style={{ padding: "1rem 0" }}>
      {TopNav("Member")}
      
      {/* <div class="vh-300 d-flex justify-content-center align-items-center ">
            <div class="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white"> */}
      <h2 className="text-center mb-4 text-primary">關於你</h2>
      <div className="mb-3">
        <center>
          <h3 className="form-label">歷史行程</h3>
          <ul className="container">
            <li><img src="https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/07/99/7702421.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930" width="500vw" height="500vw"></img>
              <div className="d-grid">Trip #1</div>
            </li>
            <li><img src="https://www.hl-go.com.tw/images/beach.jpg" width="500vw" height="500vw"></img>
              <div className="d-grid">Trip #2</div>
            </li>
            <li><img src="https://taiwan.sharelife.tw/tw-feat-pres-img/52542/4e10040620182315.jpg" width="500vw" height="500vw"></img>
              <div className="d-grid">Trip #3</div>
            </li>
          </ul>
          <div className="d-grid">
            <a href="#Send" className="btn btn-primary" type="submit" >Team up</a>
          </div>
        </center>


      </div>


      {/* <form></form> */}




      {/* </div>
            
        </div> */}

      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="full-page" id="Send">

        <ul className="container">

          <li><img src="" width="100" height="100" alt="" ></img></li>
          <div>Comment #1</div>

          <li><img src="" width="100" height="100" alt="" ></img></li>
          <div>Comment #2</div>
          <li><img src="" width="100" height="100" alt="" ></img>
            <div>Comment #3</div>
          </li>
          <li><img src="" width="100" height="100" alt="" ></img>
            <div>Comment #4</div>
          </li>
          <li><img src="" width="100" height="100" alt="" ></img>
            <div>Comment #5</div>
          </li>
          <li><img src="" width="100" height="100" alt="" ></img>
            <div>Comment #6</div>
          </li>


        </ul>

        {/* <span class="box">
<span class="text in-box">
<span class="primarytext title-quaternary bold">5 days in Hualien City</span>
<span class="secondarytext medium">Nov 22, 2022&nbsp;&nbsp;-&nbsp;&nbsp;Nov 26, 2022</span>
<span class="actiontext tiny-text">SEE / EDIT</span>
<span></span><span class="updated tiny-text medium">LAST UPDATED: 1 hour ago</span>
</span>
<span></span><span class="subtext-box in-box">
<span class="subtext body2">
<span class="default">November · popular sights</span>
<span></span><span class="hover">
<span class="line"><span class="medium-bold">Preferences:</span> November</span>
<span></span><span class="line"><span class="medium-bold">Attraction style:</span> Popular sights</span>
<span></span><span class="line"><span class="medium-bold">Pace:</span> Medium</span>
</span>
</span>
</span>
<span></span><span class="delete-conf in-box">
<span class="q title">Delete this trip?</span>
<button class="cancel sec-button">Cancel</button>
<button class="confirm sec-button">Yes, delete</button>
<span class="caution tiny-text">CAUTION: THIS CANNOT BE UNDONE</span>
</span>
</span> */}



      </div>

      {/* -------------------------------------------------------------------------------------------------- */}


      {/* <div class="vh-100 d-flex justify-content-center align-items-center ">
            <div class="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
                <h2 class="text-center mb-4 text-primary">Login Form</h2>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control border border-primary" id="exampleInputPassword1"></input>
                    </div>
                    <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
                <div class="mt-3">
                    <p class="mb-0  text-center">Don't have an account? <a href="signup.html"
                            class="text-primary fw-bold">Sign
                            Up</a></p>
                </div>
            </div>
        </div> */}


      {/* ------------------------------------------------------------------------------------------------------ */}






    </main>

  );
};