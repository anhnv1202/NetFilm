import "../assest/home.css";

import React, { useState, useRef,useEffect } from "react";
import data from "../data/alldata.json";
import user from "../data/user.json";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Form, Container } from "react-bootstrap";
import NavBar from "./Navbar";

const Home = () => {
  const [categorys, setCategorys] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);
  window.localStorage.setItem("data", JSON.stringify(categorys));

  const [usersList, setUsersList] = useState(user);
  const users = window.localStorage.getItem("users");
  useEffect(() => {
    if (users) {
      window.localStorage.setItem("users", users);
    } else {
      window.localStorage.setItem("users", JSON.stringify(usersList));
    }
  }, [usersList]);
  const handleOnClick = (id) => {
    navigate(`../filmdetail/id/${id}/`);
  };
  const handleOnClickC = (category) => {
    setSelectedCategory(category);
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
  const handleSearch = () => {
    const filtered = categorys.reduce(
      (acc, category) =>
        acc.concat(
          category.film.filter((film) =>
            film.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        ),
      []
    );
  
    setFilteredFilms(filtered);
    setSearchClicked(true);
  };

  // add ref to search input
  const searchInputRef = useRef(null);
  return (
    <div className="container-fluid">
      {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Phim Hay</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Trang chủ</Nav.Link>

              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  ref={searchInputRef}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-success" onClick={handleSearch}>
                  Search
                </Button>
              </Form>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Đăng nhập</Nav.Link>
              <Nav.Link
                eventKey={2}
                href="#memes"
                onClick={() => navigate("/register")}
              >
                Đăng kí
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <NavBar/>
      <div className="row">
        <div className="col-2">
          <h2>Thể loại</h2>
          <ul>
            {categorys != null &&
              categorys.map((category) => {
                return (
                  <li key={category.id}>
                    <a
                      href="#"
                      onClick={() => {
                        handleOnClickC(category);
                      }}
                    >
                      {category.title}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="col-8">
          <div className="row" style={{ marginTop: "30px," }}>
            
            {categorys != null &&
              categorys.map((category) => {
                return (
                  (selectedCategory == null ||
                    selectedCategory.id === category.id) &&
                  category != null &&
                  category.film
                    .filter((film) =>
                      film.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((film) => {
                      return (
                        <div key={film.id} className="col-3">
                          <img
                            src={film.img}
                            alt={film.name}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "12vw",
                              height: "16vw",
                              margin: "auto",
                              marginTop: "1vw",
                              cursor: "pointer",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            onClick={() => {
                              handleOnClick(film.id);
                            }}
                          ></img>
                          <h5
                            onClick={() => {
                              setSelectedFilm(film);
                            }}
                          >
                            {film.name}
                          </h5>
                          <p>Năm: {film.year}</p>
                          <p>Loại: {category.title}</p>
                          <p>Điểm: {GetScore(film)}</p>
                          <Button
                            className="review-btn"
                            onClick={() => {
                              handleOnClick(film.id);
                            }}
                          >
                            {selectedCategory != null &&
                              category.film.filter((film) =>
                                film.name
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              ).length === 0 && <p>No films found</p>}
                            Đánh giá
                          </Button>
                        </div>
                      );
                    })
                );
              })}
          </div>
        </div>

        <div className="col-8">
          {selectedFilm && (
            <div>
              <h2>{selectedFilm.name}</h2>
              <p>Năm: {selectedFilm.year}</p>
              <p>Loại: {selectedCategory.title}</p>
              <p>Điểm: {GetScore(selectedFilm)}</p>
              <p>Mô tả: {selectedFilm.description}</p>
              <Button
                onClick={() => {
                  handleOnClick(selectedFilm.id);
                }}
              >
                Đánh giá
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
