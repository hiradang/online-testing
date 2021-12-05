import React from 'react'
import '../css/app.css'
import logo from '../img/UET-01.png'
import { useEffect, useState } from "react"
import { useHistory} from "react-router-dom";
import axios from "axios"

function Header() {
    var id = localStorage.getItem("id");
    var role = localStorage.getItem("login")
    const [name, setName] = useState("");
    let history = useHistory();
    function logout(e) {
        console.log("logout")
        localStorage.removeItem("login")
        localStorage.removeItem("id")
        //history.push('/')
        window.location.assign('/')
    }
    useEffect(()=> {
        if (role === "student") {
            axios.get(`http://localhost:3001/admin/manage/students/${id}`).then((response) =>{
                setName(response.data.name);
            });
        } else if (role === "teacher") {
            axios.get(`http://localhost:3001/admin/manage/teachers/${id}`).then((response) =>{
                setName(response.data.teacher_name);
            });
        } else if (role === "admin") {
            setName("ADMIN")
        }
    }, [])
    return (
        <div className="header"> 
            <div class="info">
                <div className="left">
                    <img className="logo" src={logo} alt="Logo"></img>
                    <h1>Online testing</h1>
                </div>

                <div className="right">
                    <div>
                        <h2>
                            {name}
                        </h2>
                        <br/>
                    <div class="header_navbar-user">
                    <i class="fas fa-user-edit header_navbar-user-icon" ></i>
                    <a href = {`/updatePass/${id}`} className="header__navbar-select-link" >Thay đổi mật khẩu</a>
                    {/* <span class="header__navbar-select-link"  >Thay đổi mật khẩu</span> */}
                    <br/>
                    <i class="fas fa-sign-out-alt header_navbar-user-icon" ></i>
                    <span class="header__navbar-select-link" onClick={(e)=> logout(e)} >Đăng xuất</span>
                    </div>
                    </div>
                   
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