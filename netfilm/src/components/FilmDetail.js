import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/FilmDetails.css";
import Button from "react-bootstrap/Button";
const FilmDetail = (props) => {
  const { id } = useParams();
  const data = window.localStorage.getItem("data");
  const users = window.localStorage.getItem("users");
  const iduser = window.localStorage.getItem("id");
  const score = useRef(0);
  const comment = useRef();
  const [categorys, setCategorys] = useState(JSON.parse(data));
  const [listuser, setListuser] = useState(JSON.parse(users));
  const cate = categorys.find((category) => {
    return category.film.id == id;
  });
  const listOfCm = cate.film.comment;

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    cate != null && (
      <div className="content">
        <div className="fimdetail">
          <div className="img">
            <img src={cate.film.img} alt={cate.film.name}></img>
          </div>
          <div className="moreInfor">
            <h1 style={{ marginBottom: "20px" }}>{cate.film.name}</h1>
            <h6 style={{ marginBottom: "3px" }}>
              Thể loại: <span className="fwnomal">{cate.title}</span>
            </h6>
            <h6 style={{ marginBottom: "3px" }}>
              Điểm đánh giá: <span className="fwnomal">{cate.film.sc}</span>
            </h6>
            <h6 style={{ marginBottom: "3px" }}>
              Mô tả: <span className="fwnomal">{cate.film.description}</span>
            </h6>
            <div className="rateAndScore">
              {iduser != "" ? (
                <form
                  className="hide"
                  onSubmit={(e) => {
                    handleOnSubmit(e);
                  }}
                >
                  <h5>Chi tiết đánh giá</h5>
                  <p>Điểm đánh giá:</p>
                  <input type="number" ref={score} />
                  <p>Bình Luận</p>
                  <textarea
                    type="text"
                    rows={2}
                    ref={comment}
                    placeholder="Viết bình luận ..."
                  ></textarea>
                  <Button type="submit" className="btnbut">
                    Đánh giá
                  </Button>
                </form>
              ) : (
                <Button onClick={() => {}} className="btnbut">
                  Đánh giá
                </Button>
              )}

              <div className="comment">
                <h4>Bình Luận</h4>
                {listOfCm == null || listOfCm.length == 0 ? (
                  <h3>No comment</h3>
                ) : (
                  listOfCm.map((comment) => {
                    return (
                      <div key={comment.id}>
                        <h5>
                          {listuser != null &&
                            listuser.find((u) => {
                              return u.id == comment.userid;
                            }).fullname}
                          :
                          <span className="comment_detail">
                            {comment.comment}
                          </span>
                        </h5>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default FilmDetail;
