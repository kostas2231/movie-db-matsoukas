import React, { useEffect, useState } from "react";
import "../Styles/Content.css";
import { useLoaderData } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";

export default function Content() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const loadMovies = useLoaderData();
  let params = useParams();
  //to useEffect θα γεμισει τον πινακα με ταινιες ενος συγκεκριμενου genre, το page εχει ενα counter που εχει αρχικη τιμη 1 ωστε να πηγαινουμε στην πρωτη σελιδα.
  useEffect(() => {
    console.log(loadMovies);
    setMovies(loadMovies.data.results);
    setPage(loadMovies.data.page);
  }, [loadMovies]);

  return (
    <div className="content-wrapper">
      <div className="card-box">
        {movies.map((movie) => {
          //mapping για να παρω ολα τις ταινιες και για καθε μια να γυρισω ενα card component που θα γεμισει το main area.
          //το Link ειναι απο το router-dom και θα μας κανει redirect στην προηγουμενη ή την επομενη σελιδα του εκαστοτε genre αναλογα με το πιο 'βελακι' θα πατηθει.
          return <Card movie={movie}></Card>;
        })}
      </div>

      <div class="pagination">
        <Link to={`/${params.genre}/${page - 1}`}>❮</Link>
        <div className="page_div">Σελίδα: {page} </div>
        <Link to={`/${params.genre}/${page + 1}`}>❯</Link>
      </div>
    </div>
  );
}
