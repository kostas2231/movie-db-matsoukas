import React, { useState } from "react";
import "../Styles/Card.css";
import "../Styles/Modal.css";
import MoviesService from "../Services/MoviesDb_service.js";

// Card component

export default function Card(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});

  //function για να παιρνω τον director απο καθε ταινια κανοντας filter το crew της ταινιας
  function getDirector() {
    let res = movieDetails.credits.crew.filter(
      (member) => member.job === "Director"
    );
    return res[0].name;
  }

  //function για να γεμισω το object movieDetails με το εκαστοτε id της ταινιας
  const getMov = () => {
    MoviesService.getMovieById(props.movie.id, {
      language: "el-GR",
      append_to_response: "credits",
    })
      .then((res) => {
        console.log("res", res);
        setMovieDetails(res.data);
        toggleModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="card-container">
      <img
        src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
      />
      <h1>Τίτλος: {props.movie.title} </h1>
      <h2>Έτος κυκλοφορίας: {props.movie.release_date}</h2>
      <div className="btn_holder">
        <button
          onClick={() => {
            getMov();
          }}
        >
          Μάθε περισσότερα
        </button>
      </div>

      {isModalVisible && (
        //conditional rendering αναλογα με το state του modal
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            />
            <h1>Τίτλος: {movieDetails.title}</h1>
            <h2>Έτος κυκλοφορίας: {movieDetails.release_date}</h2>
            <p> {movieDetails.overview}</p>
            <h3>Διάρκεια: {movieDetails.runtime} Λεπτά</h3>
            <h3>Σκηνοθέτης: {getDirector()}</h3>
            <h3>
              Ηθοποιοί: {movieDetails.credits.cast[0].name},
              {movieDetails.credits.cast[1].name},
              {movieDetails.credits.cast[2].name}
            </h3>
            <h3>
              Είδη:
              {movieDetails.genres.map((genre) => {
                return <span> {genre.name} </span>;
              })}
            </h3>
            <button className="close-modal" onClick={toggleModal}>
              Κλείσιμο
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
