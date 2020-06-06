import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReviewsService from "../../services/ReviewsService";
import { positionTypes } from "../../constants/translation";

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
    return (
      <main className="col-12 bonuce ">
        <h3 className="m-3">Резюме</h3>
        <Link to="/addreview" className="btn btn-primary mt-3">
          Создать резюме
        </Link>
        <div className="d-flex flex-wrap justify-content-around">
          {reviews.map((review) => (
            <div
              className="card col-5 text-left"
              style={{ height: "max-content" }}
              key={review._id}
            >
              <h5 className="card-header">{`${review.surname} ${review.name} ${review.patronymic}`}</h5>
              <div className="card-body">
                <h5 className="card-title">Комментарий</h5>
                <p className="card-text">{review.description}</p>
                <p className="card-text">e-mail: {review.email}</p>
                <p className="card-text">Телефон: {review.phone}</p>
                <p className="card-text">Приоритет: {review.priority}</p>
                <p className="card-text">
                  Должность: {positionTypes[review.type]}
                </p>
                <a href="#" className="btn btn-primary m-1">
                  Редактировать
                </a>
                <a
                  href="#"
                  className="btn btn-primary m-1"
                  onClick={async () => {
                    await ReviewsService.createEmployee(review._id);
                    this.props.history.push("/employees");
                  }}
                >
                  Взять на работу
                </a>
                <div
                  className="btn btn-primary m-1"
                  onClick={() => this.deleteReview(review._id)}
                >
                  Удалить резюме
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default Review;
