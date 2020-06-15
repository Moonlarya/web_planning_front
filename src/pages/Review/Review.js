import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReviewsService from "../../services/ReviewsService";
import { positionTypes } from "../../constants/translation";
import { withAuth } from "../../stores/User";

import {
  faEdit,
  faTrashAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Review extends Component {
  state = {
    reviews: [],
  };
  loadReviews = async () => {
    const reviews = await ReviewsService.getAll();
    this.setState({ reviews: reviews });
  };
  async componentDidMount() {
    this.loadReviews();
  }
  deleteReview = async (id) => {
    await ReviewsService.delete(id);
    this.loadReviews();
  };
  render() {
    const { reviews } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h3 className="m-3">Резюме</h3>
        <Link to="/addreview" className="btn btn-primary mt-3">
          Создать резюме
        </Link>
        <div className="d-flex flex-wrap justify-content-around">
          {reviews.map((review) => (
            <div
              className="card  col-8 col-md-5 col-lg-3 m-3 text-left"
              style={{ height: "max-content" }}
              key={review._id}
            >
              <h5 className="card-header">{`${review.surname} ${review.name} ${review.patronymic}`}</h5>
              <div>
                <h5 className="card-title">Комментарий</h5>
                <p className="card-text">{review.description}</p>
                <p className="card-text">e-mail: {review.email}</p>
                <p className="card-text">Телефон: {review.phone}</p>
                <p className="card-text">Приоритет: {review.priority}</p>
                <p className="card-text">
                  Должность: {positionTypes[review.type]}
                </p>
                <div className="w-100">
                  <Link
                    to={`/review/${review._id}`}
                    className="btn btn-primary m-1 w-100"
                  >
                    <FontAwesomeIcon icon={faEdit} color="blue" />
                    <span className="visibleHeaders">Редактировать</span>
                  </Link>
                  {user.type === "manager" && (
                    <a
                      href="#"
                      className="btn btn-primary m-1 w-100"
                      onClick={async () => {
                        await ReviewsService.createEmployee(review._id);
                        this.props.history.push("/employees");
                      }}
                    >
                      <FontAwesomeIcon icon={faUserPlus} color="blue" />
                      <span className="visibleHeaders">Взять на работу</span>
                    </a>
                  )}
                  <div
                    className="btn btn-outline-danger m-1 w-100"
                    onClick={() => this.deleteReview(review._id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} color="red" />
                    <span className="visibleHeaders">Удалить резюме</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuth(Review);
