import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function UpdatePass() {
    const [newPass, setNewPass] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let {id} = useParams();
    let history = useHistory();
    const submit = (e) => {
        e.preventDefault();
        if (newPass !== confirmPassword) {
            Swal.fire({
                title: "Oops...",
                text: "Wrong New Password And Confirm Password Combination",
                icon: "question",
                button: "Done",
        
            })
        } else {
            const data = {password: password, newPass: newPass };
            axios.put(`http://localhost:3001/account/update/${id}`, data).then((response) => {
                if (response.data.error) {
                    // alert(response.data.error);
                    Swal.fire({
                        title: "Oops...",
                        text: response.data.error,
                        icon: "question",
                        button: "Done",
                
                    })
                } else {
                    history.push("/")
                    window.location.reload()
                    // console.log(response.data)
                    // localStorage.setItem("login", response.data.role);
                    // localStorage.setItem("id", response.data.id_account.toString())
                   // window.location.reload();
                    // if (response.data.role === "teacher") history.push(`/teacher/${response.data.id_account}`);
                    // else history.push(`/student/${response.data.id_account}`);
                }
            });
        }
  };
    return (
    <div class = "container-login">
        <div class = "login-input" >
            <form method = "POST" action = "/" >
            <h2>Thay đổi mật khẩu</h2>
            <div class="input-box">
            <label for="exampleInputEmail1">Password</label>
                <i class="input-icon fas fa-lock"></i>
                <input type="password" class = 'form-control'id = "password" name = 'password' placeholder="Password" required
                onChange={(event) => {
                setPassword(event.target.value);
        }}>
            </input>
            </div>
            <div class="input-box">
                <label for="exampleInputPassword1">New password</label>
                <i class="input-icon fas fa-lock"></i>
                <input type="password" class="form-control" id="newPassword" name = 'newPassword' placeholder="New password" required
                onChange={(event) => {
                    setNewPass(event.target.value);
                }}></input>
            </div>
            <div class="input-box">
                <label for="exampleInputPassword1">Confirm password</label>
                <i class="input-icon fas fa-lock"></i>
                <input type="password" class="form-control" id="confirmPassword" name = 'newPassword' placeholder="New password" required
                onChange={(event) => {
                    setConfirmPassword(event.target.value);
                }}></input>
            </div>
            <button type="submit" id= "submit" class="btn btn-primary btn-submit"  onClick= {(e) => submit(e)} >Submit</button>
            </form>
        </div>
    </div>
    )
}

export default UpdatePass
