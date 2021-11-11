import React, {useState} from 'react'
import '../css/app.css'
import notFoundPhoto from '../img/page-not-found.svg'

function NotFoundPage() {
    return (
        <div className="NotFoundPage"> 
            <img src={notFoundPhoto} 
            alt="notfound"
            ></img>
        </div>
    )
}

export default NotFoundPage;