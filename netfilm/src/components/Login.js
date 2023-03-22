import React, { useState } from "react";
import swal from "sweetalert";

const Login = () => {
    const users = window.localStorage.getItem("users");
    const [usersList,setUsersList] = useState(JSON.parse(users));
    console.log(usersList);
};
export default Login;
