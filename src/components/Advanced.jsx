import React, { useState, useMemo, useRef, createRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import '../routes/Tinder.css'
import url from '../url';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function submit(record,cookies) {
  fetch(url
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }, body: JSON.stringify({ type: "python", query: ["recommend.py", record.join(","), cookies["user_id"], cookies["team_id"]] })
          // ,
          // signal: controller.signal
        }
      ).then((response) => {
        if (response.status !== 200) throw Error('http failed!');
        return response.text();
      })
      .then((raw) => {
        // console.debug(raw);
        if (!raw) throw Error('no data!');
        const parsed = JSON.parse(raw);
        // console.debug(parsed);
        if (!parsed) throw Error('wrong data format!');
        console.debug(parsed["data"])
      })
      .catch((reason) => {
        console.error(reason);
      }).finally(() => {
      });
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
const db = [
  {
    name: '七星潭 - 花蓮',
    url: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/07/99/7702421.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930'
  },
  {
    name: '清水斷崖 - 花蓮',
    url: 'https://www.hl-go.com.tw/images/beach.jpg'
  },
  {
    name: '太魯閣國家公園 - 花蓮',
    url: 'https://taiwan.sharelife.tw/tw-feat-pres-img/52542/4e10040620182315.jpg'
  },
  {
    name: '慕谷慕魚生態廊道 - 花蓮',
    url: 'https://img.ltn.com.tw/Upload/news/600/2021/08/17/phpb7w6Tl.jpg'
  },
  {
    name: '白楊步道水濂洞 - 花蓮',
    url: 'https://tluxe-aws.hmgcdn.com/public/article/2017/atl_20190502150919_171.jpg'
  }
]

function Advanced() {
  const { height, width } = useWindowDimensions();
  const [data, setData] = useState();
  const navigate = useNavigate();
  // const [curStat, setCurStat] = useState({ curID: db.length - 1, curWay: null })
  const [record, setRecord] = useState([])
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
  const [cookies, setCookie, removeCookie]=useCookies()
  const childRefs = useMemo(() =>
    Array(db.length).fill(0).map((i) => createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    if (direction === "left" || direction === "right") {
      const r = record.map(x => x)
      r.push(direction === "left" ? -1 : 1)
      setLastDirection(direction)
      updateCurrentIndex(index - 1)
      setRecord(r)
      console.debug(direction, index);
    }
  }

  // const outOfFrame = (name, idx) => {
  //   console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current, lastDirection);
  //   // handle the case in which go back is pressed before card goes outOfFrame
  //   currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  //   // TODO: when quickly swipe and restore multiple times the same card,
  //   // it happens multiple outOfFrame events are queued and the card disappear
  //   // during latest swipes. Only the last outOfFrame event should be considered valid
  // }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const r = record.map(x => x);
    const newIndex = currentIndex + 1;
    r.pop();
    setRecord(r);
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  // useEffect(()=>{
  //   const q = `select * from project.attraction`;
  //   fetch(url
  //     , {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //       }, body: JSON.stringify({ type: "sql", query: q })
  //       // ,
  //       // signal: controller.signal
  //     }
  //   ).then((response) => {
  //     if (response.status !== 200) throw Error('http failed!');
  //     return response.text();
  //   }).then((raw) => {
  //     // console.debug(raw);
  //     if (!raw) throw Error('no data!');
  //     const parsed = JSON.parse(raw);
  //     // console.debug(parsed);
  //     if (!parsed) throw Error('wrong data format!');
  //   }).catch((reason) => {
  //     console.error(reason);
  //   }).finally(() => {
  //   });
  // },[data])
  return (
    <div>
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
            flickOnSwipe={true}
            onSwipe={(dir) => {
              swiped(dir, character.name, index);
            }}
            preventSwipe={["up", "down"]}
            swipeRequirementType={"position"}
            swipeThreshold={~~(width / 10)}
          // onCardLeftScreen={() => outOfFrame(character.name, index)}
          // onSwipeRequirementFulfilled={(dir) => {
          //   if (dir === "right" || dir === "left") { swiped(dir, character.name, index) }
          //   else { ; }
          // }}
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
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Dislike</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Like</button>
      </div>
      <div className='buttons'>
        {(db.length == record.length) ? <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => {submit(record, cookies);navigate("/Member");}}>submit</button> : null}
      </div>

      
      {/* {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )} */}
    </div>
  )
}

export default Advanced
