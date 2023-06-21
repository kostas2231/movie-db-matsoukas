import React, { useState, useEffect } from "react";
import "../App.css";
import MoviesService from "../Services/MoviesDb_service.js";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

export default function Sidebar() {
  const [genres, setGenres] = useState([]);

  //function για sorting αλφαβητικα
  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  // το useeffect τρεχει μια φορα και γεμιζει τον πινακα genres με οτι genre γυρισε το Api call
  useEffect(() => {
    MoviesService.getGenres()
      .then((res) => {
        //το σορτινγκ γινεται στο επιπεδο του result και μετα περναω τον ηδη σορταρισμενο πινακα με genres
        res.data.genres.sort(compare);
        setGenres(res.data.genres);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="sidebar-wrapper">
      <div className="title">
        <div>Movies DB</div>
      </div>
      <div style={{ textAlign: "center" }}>Konstantinos Matsoukas</div>
      <div className="sidebar">
        <div className="sidebar_items">
          {genres.map((genre) => {
            //mapping για να παρω ολα τα genres και για καθε ενα να γυρισω ενα div που θα γεμισει το sidebar.
            //το Link ειναι απο το router-dom και θα μας κανει redirect στην πρωτη σελιδα που γυρναει το api απο το εκαστοτε genre
            return (
              <Link to={`/${genre.id}/1`}>
                <div className="sidebar_item">
                  <i className="home"></i>
                  <p>{genre.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
