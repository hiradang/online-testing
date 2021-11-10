import React, {useState} from 'react'
import '../css/app.css'
import logo from '../img/UET-01.png'

function Header() {
    return (
        <div className="header"> 
            <div class="info">
                <div className="left">
                    <img className="logo" src={logo} alt="Logo"></img>
                    <h1>Online testing</h1>
                </div>

                <div className="right">
                    <h2>
                        Đặng Thị Bình
                    </h2>
                </div>
            </div>

            <div className="navbar">
                <h3><a href="/">Home</a></h3>
                <div>
                    Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội
                </div>
            </div>
        </div>
    )
}

export default Header;