import React, {useState} from 'react'
import '../css/app.css'
import noInformation from '../img/no-information.svg'

function NoInformation() {
    return (
        <div className="noInformation"> 
            <img src={noInformation} 
                alt="noInformation"
            ></img>
        <p>Chưa có cập nhật mới</p>
        </div>
    )
}

export default NoInformation;