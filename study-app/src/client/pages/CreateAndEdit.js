import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/editPage.css";
import { Link } from "react-router-dom";

export default function CreateAndEdit() {
  const [sets, setSets] = useState([]);
  const [setIds, setSetIds] = useState([]);

  const getCardsFromDatabase = () => {
    Axios.get(`http://localhost:3001/getUserSets/${localStorage.getItem('id')}`)
      .then((response) => {
        if (response != null) {
          const responseData = response.data;
          const setNames = responseData.map((data) => data.setName);
          const setId = responseData.map((data) => data.setId);
          setSets(setNames);
          setSetIds(setId);
        }
      });
  };

  useEffect(() => {
    getCardsFromDatabase();
  }, []);


  return (
    <>
      <div className="setContainer">
        {sets.map((setName, index) => (
          <div key={index} className="setButtons">
            <Link to={`/?name=${setName}&setId=${setIds[index]}`}>{setName}</Link>
          </div>
        ))}
      </div>
    </>
  );
}