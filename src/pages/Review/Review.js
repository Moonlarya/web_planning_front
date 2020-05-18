import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReviewsService from "../../services/ReviewsService";

class Review extends Component {
  state = {
    reviews: [],
  };
  async componentDidMount() {
    const reviews = await ReviewsService.getAll();
    this.setState({ reviews: reviews });
  }
  render() {
    const { reviews } = this.state;
    return (
      <main className="col-12 bonuce">
        <Link to="/addreview" className="btn btn-primary mt-3">
          Создать резюме
        </Link>
        <div className="d-flex flex-wrap">
          {reviews.map((review) => (
            <div className="card col-6" key={review._id}>
              <h5 className="card-header">{review.name}</h5>
              <div className="card-body">
                <h5 className="card-title">Комментарий</h5>
                <p className="card-text">{review.description}</p>
                <h5 className="card-title">e-mail</h5>
                <p className="card-text">{review.email}</p>
                <h5 className="card-title">Телефон</h5>
                <p className="card-text">{review.phone}</p>
                <h5 className="card-title">Приоритет</h5>
                <p className="card-text">{review.priority}</p>
                <h5 className="card-title">Должность</h5>
                <p className="card-text">{review.type}</p>
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
                <a href="#" className="btn btn-primary m-1">
                  Удалить
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default Review;
