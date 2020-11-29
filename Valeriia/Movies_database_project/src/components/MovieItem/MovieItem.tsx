import React from "react";
import "./MovieItem.scss";

interface IMovieItemProps {
  image: string;
  title: string;
  date: number;
  genre: string;
}

const MovieItem = ({ image, title, date, genre }: IMovieItemProps) => (
  <div className="item">
    <div className="item__poster">
      <img src={`/images/${image}`} alt="movie" className="item__img" />
    </div>
    <div className="item__info">
      <span>{title}</span>
      <span className="item__date">{date}</span>
    </div>
    <div className="item__genre">
      <span>{genre}</span>
    </div>
  </div>
);

export default MovieItem;
