import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../utils/queries";
import BookTable from "./BookTable";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS);
  const [genreList, setGenreList] = useState([]);
  const [getBooks, bookResult] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    getBooks({ variables: { genre } });
  }, [genre, getBooks]);

  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks;
      const newGenres = [];
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (newGenres.indexOf(genre) === -1) {
            newGenres.push(genre);
          }
        });
      });
      setGenreList(newGenres);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  } else if (result.loading) {
    return <div>loading...</div>;
  } else if (bookResult.loading) {
    return <div>loading books...</div>;
  }

  const books = bookResult.data.allBooks;

  let selectedGenre;
  if (genre === "") {
    selectedGenre = <p>in all genres</p>;
  } else {
    selectedGenre = (
      <p>
        in genre <span style={{ fontWeight: "bold" }}>{genre}</span>
      </p>
    );
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre}
      <BookTable books={books} />
      {genreList.map((genre) => {
        return (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        );
      })}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
