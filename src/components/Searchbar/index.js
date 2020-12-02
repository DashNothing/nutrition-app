/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react'
import { jsx } from "@emotion/react";
import { useHistory } from "react-router-dom";
import {
  searchFieldStyle,
  searchButtonStyle,
  searchForm,
} from "./SearbarStyles";


const Searchbar = ({ nav }) => {
  const [inputValue, setInputValue] = useState("");

  const history = useHistory();

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.length > 0)
      history.push(`/search?q=${inputValue}`);
  }

  return (
    <form
      css={searchForm}
      onSubmit={handleSubmit}
      className={nav ? "nav" : ""}
    >
      <input css={searchFieldStyle}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for food..." />
      <input css={searchButtonStyle} type="submit" value="Search" />
    </form>
  )
}

export default Searchbar
