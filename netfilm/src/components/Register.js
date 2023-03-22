import React, { useState } from "react";
import swal from "sweetalert";

import "../assest/register.css";
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('nam');
    const users = window.localStorage.getItem("users");
    const [usersList,setUsersList] = useState(JSON.parse(users));
    console.log(gender);
    const handleSubmit = event => {
      event.preventDefault();
        const isDuplicateEmail= usersList.some(user => user.email === email);
        if(isDuplicateEmail) {
            swal({
                title: "Đăng nhập thất bại",
                text: "Tài khoản email này đã tồn tại, vui lòng sử dụng emal khác!",
                icon: "Lỗi",
                button: "OK"
              });
              return;
        }

        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!regex.test(password)) {
      // Hiển thị thông báo nếu mật khẩu không đủ yêu cầu
      return swal({
        title: "Đăng nhập",
        text: "Mật khẩu phải chứa ít nhất 8 ký tự bao gồm ít nhất 1 ký tự viết hoa, ít nhất 1 ký tự số",
        icon: "Lỗi",
        button: "OK"
      });
    }

      swal({
        title: "Đăng ký thành công",
        text: "Cảm ơn bạn đã đăng ký một tài khoản với chúng tôi!",
        icon: "Thành công",
        button: "OK"
      }).then(() => {
        const newUser = {
          id: Date.now(),
          email:email,
          password:password,
          fullName:name,
          gender:gender
        };
        window.localStorage.setItem("users", JSON.stringify([... usersList,newUser]));
         window.location.href = "/login";
      });
    }
    
    return (
      <div className="register">
        <form onSubmit={handleSubmit} className="register-form">
          <h1>Đăng ký tài khoản</h1>
          
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={e => setName(e.target.value)}
            required
          />
         <label id="gender">Giới tính
          
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="nam"
                checked={gender === 'nam'}
                onChange={() => setGender('nam')}
                required
              />Nam
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="nữ"
                checked={gender === 'nữ'}
                onChange={() => setGender('nữ')}
                required
              />Nữ
            </label>
          
          </label>
          <p>Nếu tài khoản đã tồn tại? <a href="/login">Đăng nhập ngay</a></p>
          <button type="submit" className="submit-btn">Đăng ký</button>
         
        </form>
        
      </div>
    );
  }
export default Register;
