/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState, useEffect } from 'react'
import { BsController } from "react-icons/bs";
import { useLocation, useHistory } from "react-router-dom";
import UseAnimations from 'react-useanimations';
import loading from "react-useanimations/lib/loading";
import FoodList from "../../components/FoodList";
import ListDisplayMenu from "../../components/ListDisplayMenu";
import {
  searchStyle,
  wrapperStyle,
  topContainerStyle,
  resutInfoStyle,
  spinningWheelStyle,
} from "./SearchStyles";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery();
  const API_KEY = "WCsllB7f9m6qRwybiPba4f2IScSYGPzVyBWJAgUh";

  const [fetchedData, setFetchedData] = useState({
    totalHits: 0,
    query: "",
  });
  const [foods, setFoods] = useState([]);

  const [isGrid, setIsGrid] = useState(false);

  function handleListClick() {
    setIsGrid(false);
  }

  function handleGridClick() {
    setIsGrid(true);
  }

  const abortController = new AbortController();
  const abortSignal = abortController.signal;

  useEffect(() => {
    setFetchedData(null);
    if (query.get("q")) {
      fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.get("q").toString(),
          dataType: ["Survey (FNDDS)"],
          sortBy: "score",
        }),
        signal: abortSignal,
      })
        .then(res => res.json())
        .then(data => {
          setFetchedData({
            totalHits: data.totalHits,
            query: data.foodSearchCriteria.query
          });
          setFoods(data.foods);
        })
        .catch(err => console.log(err));

      return function cleanup() {
        abortController.abort();
      }
    }
  }, [useLocation()]);

  return (
    <main css={searchStyle}>
      {
        fetchedData ?
          <div css={wrapperStyle}>
            <div css={topContainerStyle}>
              <p css={resutInfoStyle}>
                {fetchedData.totalHits} results found for&nbsp;
          {fetchedData.query}
              </p>
              <ListDisplayMenu
                isGrid={isGrid}
                onGridClick={handleGridClick}
                onListClick={handleListClick} />
            </div>
            <FoodList foods={foods} isGrid={isGrid} />
          </div>
          : <UseAnimations
            css={spinningWheelStyle}
            animation={loading}
            size={200}
            strokeColor={"var(--primary-color)"} />
      }
    </main>

  )
}

export default Search
