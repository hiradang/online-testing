import React, {useState} from 'react'
import '../css/app.css'

function Footer() {
    

    return (
        <div className="footer"> 
            <div className="left">
                <p><i class="fas fa-school"></i>Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội</p>
                <p><i class="fas fa-map-marker"></i>E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
            </div>

            <div className="right">
                <p>Made by Bình Đặng và Loan Bùi</p>
                <p>K64J - Oct 2021</p>
            </div>
        </div>
    )
}

export default Footer;