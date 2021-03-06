import React from 'react'
import {
    Link
} from "react-router-dom";
import { Button } from 'ui-neumorphism'
import PostureGif from '../assets/posture.gif'
import { sendAmplitudeData } from '../utils/amplitude'

const Home = () => {

    const onGetStartedClick = () => {
        sendAmplitudeData('get-started-button')
    }

    return (<div className="home">
        <h1>Strong Posture</h1>
        <img src={PostureGif} alt="" />
        <div className="home-description">
            <span>Pomodoro sessions</span>
            <span>+</span>
            <span>Reminders to keep posture correct</span>
        </div>
        <Link to="/permissions" onClick={onGetStartedClick} className="no-underline"> <Button className="main-big-button">Get started</Button></Link>
    </div>)
}

export default Home