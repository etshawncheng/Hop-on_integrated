import React, { useState } from 'react';
import userIcon from '../img/icon.jpg';
import Image from 'react-bootstrap/Image';
import {Card, Button} from 'react-bootstrap/';
import { AutoScrollActivator } from '@dnd-kit/core';

export default function PersonalPage(props) {

    const dummydata = [{
        userId: 10101010,
        historyRoute: [
            {
                teamId: 12121212,
            },
            {
                teamId: 13131313,
            }
        ]
    }]

    const [personalHistory, updatePerHis] = useState(dummydata)

    return (
        <div>
            <Image roundedCircle={true} src={userIcon} style={{height:'100px', width:'100px'}}/>
            <div style={{height:'50%', width:'80%', backgroundColor: '#ACACAC', display:'flex', justifyContent:'center', alignItem:'center', padding: '5% 5% 5% 5%', margin: 'auto'}}>
            {personalHistory[0].historyRoute.map((history, index) =>
                <Card style={{ width: '18rem' }} key={index}>
                    <Card.Body>
                        <Card.Title>{"teamId: "+ history.teamId}</Card.Title>
                        <Card.Text>
                            <div>{"哈哈這次去哪玩呀!"}</div>
                        </Card.Text>
                        <Button variant="primary">打開行程</Button>
                    </Card.Body>
                </Card>
            )}
            </div>
        </div>
    )

}