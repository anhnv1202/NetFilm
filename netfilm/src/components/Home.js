import React, { useState } from "react";
import data from "../data/alldata.json";
import user from "../data/user.json";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [categorys, setCategorys] = useState(data);
  const [users, setUsers] = useState(user);
  const navigate = useNavigate();
  window.localStorage.setItem("data", JSON.stringify(categorys));
  window.localStorage.setItem("users", JSON.stringify(users));
  const handleOnClick = (id) => {
    navigate(`../filmdetail/id/${id}/`);
  };
  return (
    <>
      {categorys != null &&
        categorys.map((category) => {
          return (
            <div
              key={category.film.id}
              onClick={() => {
                handleOnClick(category.film.id);
              }}
            >
              <h1>{category.film.name}</h1>
              <p>{category.film.description}</p>
            </div>
          );
        })}
    </>
  );
};

export default Home;
