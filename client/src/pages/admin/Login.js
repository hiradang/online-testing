import React from 'react';
import {useState } from "react";
import Swal from 'sweetalert2';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const submit = (e) => {
        e.preventDefault();
        if (username !== "ADMIN") {
            Swal.fire({
                title: "Oops...",
                text: "User Doesn't Exist",
                icon: "question",
                button: "Done",
        
            })
        } else if (password !== "loan_binh") {
            Swal.fire({
                title: "Oops...",
                text: "Wrong Username And Password Combination",
                icon: "question",
                button: "Done",
        
            })
        } else {
                localStorage.setItem("login", "admin");
                window.location.reload();
              }
  };
    return (
    <div class = "container-login">
        <div class = "login-input" >
            <form method = "POST" action = "/" >
            <h2>Đăng nhập Admin</h2>
            <div class="input-box">
            <label for="exampleInputEmail1">Username</label>
                <i class="input-icon fas fa-user "></i>
                <input class = 'form-control'id = "username" name = 'username' placeholder="Username" required
                onChange={(event) => {
                setUsername(event.target.value);
        }}>
            </input>
            </div>
            <div class="input-box">
                <label for="exampleInputPassword1">Password</label>
                <i class="  input-icon fas fa-lock"></i>
                <input type="password" class="form-control" id="password" name = 'password' placeholder="Password" required
                onChange={(event) => {
                    setPassword(event.target.value);
                }}></input>
            </div>
            <button type="submit" id= "submit" class="btn btn-primary btn-submit"  onClick= {(e) => submit(e)} >Đăng nhập</button>
            </form>
        </div>
    </div>
    )
}

export default Login
