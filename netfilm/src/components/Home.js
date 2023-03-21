import React, { useState } from "react";
import data from "../data/alldata.json";
import user from "../data/user.json";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
const Home = () => {
  const [categorys, setCategorys] = useState(data);
  const [users, setUsers] = useState(user);
  const navigate = useNavigate();
  window.localStorage.setItem("data", JSON.stringify(categorys));
  window.localStorage.setItem("users", JSON.stringify(users));
  const handleOnClick = (id) => {
    navigate(`../filmdetail/id/${id}/`);
  };
  const GetScore = (film) => {
    var sc = 0;
    var total = 0;
    film.comment != undefined &&
      film.comment != null &&
      film.comment.forEach((f) => {
        if (f.score != null) {
          sc += f.score;
          total += 1;
        }
      });
    if (total != 0) sc = (sc / total).toFixed(1);
    return sc;
  };
  return (
    <div className="container-fluid">
      <h1>Css đống này đi :))</h1>
      <div className="row">
        {categorys != null &&
          categorys.map((category) => {
            return (
              category != null &&
              category.film.map((film) => {
                return (
                  <div
                    key={film.id}
                    onClick={() => {
                      handleOnClick(film.id);
                    }}
                    className="col-3"
                  >
                    <img
                      src={film.img}
                      alt={film.name}
                      style={{ width: "12vw", height: "16vw", margin: "auto" }}
                    ></img>
                    <h5>{film.name}</h5>
                    <p>Năm: {film.year}</p>
                    <p>Loại: {category.title}</p>
                    <p>Điểm: {GetScore(film)}</p>
                    <Button>Đánh giá</Button>
                  </div>
                );
              })
            );
          })}
      </div>
    </div>
  );
};

export default Home;
