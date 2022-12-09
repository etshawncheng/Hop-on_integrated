import Nav from 'react-bootstrap/Nav';
import { BsPerson } from 'react-icons/bs';
import Taipei from './assets/taipei-101.jpg'
import Taichung from './assets/taichung.jpg'
import Taitung from './assets/taitung.jpg'
import Tainan from './assets/台南_OG圖_shelly.jpg'
import Hualien from './assets/hualien.jpg'
import Kaohsiung from './assets/koahsuing.jpg'
import './Tinder.css'
import TopNav from '../components/topNav';
//////////////////////////////////////////////////////////////////////////上面 JS 
import React, { useState, useMemo, useRef } from 'react'
// import TinderCard from 'react-tinder-card'
// import './Tinder2.js'


export function Tinder() {
  var Hammer;
var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  console.log(tinderContainer);
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);

  return (
      <main style={{ padding: "1rem 0" }}>
        {TopNav("Tinder")}
  <title>CodePen - tinder card</title>

  {/* <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div> */}


  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"></link>
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'></link>
<link rel="stylesheet" href="./Tinder.css"></link>


<body>

  <div class="tinder">
    <div class="tinder--status">
      <i class="fa fa-remove"></i>
      <i class="fa fa-heart"></i>
    </div>
  
    <div class="tinder--cards">
      <div class="tinder--card">
      
          <img src="https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/07/99/7702421.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930" ></img>
          <h3>七星潭</h3>
        <p>花蓮</p>
      </div>
      <div class="tinder--card">
      
      <img src="https://www.hl-go.com.tw/images/beach.jpg" ></img>
      <h3>清水斷崖</h3>
        <p>花蓮</p>
      </div>
      <div class="tinder--card">
      
      <img src="https://taiwan.sharelife.tw/tw-feat-pres-img/52542/4e10040620182315.jpg"></img>
      <h3>太魯閣國家公園</h3>
        <p>花蓮</p>
      </div>
      <div class="tinder--card">
      
      <img src="https://img.ltn.com.tw/Upload/news/600/2021/08/17/phpb7w6Tl.jpg"></img>
      <h3>慕谷慕魚生態廊道</h3>
        <p>花蓮</p>
      </div>
      <div class="tinder--card">
      <img src="https://tluxe-aws.hmgcdn.com/public/article/2017/atl_20190502150919_171.jpg"></img>
      <h3>白楊步道水濂洞</h3>
        <p>花蓮</p>
      </div>
    </div>
  
    <div class="tinder--buttons">
      <button id="nope"><i class="fa fa-remove"></i></button>
      <button id="love"><i class="fa fa-heart"></i></button>
    </div>
  </div>
  
    <script src='https://hammerjs.github.io/dist/hammer.min.js'></script>
    <script  src="./Tinder2.js"></script>
  
  </body>

</main>
    );
  }

// function initCards(card, index) {
//   var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

//   newCards.forEach(function (card, index) {
//     card.style.zIndex = allCards.length - index;
//     card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
//     card.style.opacity = (10 - index) / 10;
//   });
  
//   tinderContainer.classList.add('loaded');
// }



   