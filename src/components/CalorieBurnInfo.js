/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import { FaWalking, FaRunning, FaBicycle } from "react-icons/fa"


const containerStyle = css`
  width: 100%;
  margin: 50px 0 400px;
  display: flex;
  justify-content: space-evenly;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  font-size: 4rem;
  border-radius: 100px;
  color: #fff;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  text-align: center;

  p {
    text-transform: uppercase;
  }

  .colored {
    font-weight: 600;
  }

  &.walk {
    ${IconContainer} {
      background-color: #01DF8F;
    }

    .colored {
      color: #01DF8F;
    }
  }

  &.run {
    ${IconContainer} {
      background-color: #01D2DF;
    }

    .colored {
      color: #01D2DF;
    }
  }

  &.cycle {
    ${IconContainer} {
      background-color: #3C95FF;
    }

    .colored {
      color: #3C95FF;
    }
  }
`;

const CalorieBurnInfo = ({ calories }) => {
  const [walkMins, setWalkMins] = useState(0);
  const [runMins, setRunMins] = useState(0);
  const [cycleMins, setCycleMins] = useState(0);


  useEffect(() => {
    const calorieNum = calories.match(/\d+/)[0];
    console.log(calorieNum);
    setWalkMins(Math.round(calorieNum / 6));
    setRunMins(Math.round(calorieNum / 12));
    setCycleMins(Math.round(calorieNum / 9));
  }, [calories]);

  return (
    <React.Fragment>
      <p>To burn these calories it takes</p>
      <div css={containerStyle}>
        <InfoContainer className="walk">
          <IconContainer>
            <FaWalking />
          </IconContainer>
          <p className="colored">Walking</p>
          <p>{walkMins} minutes</p>
        </InfoContainer>
        <InfoContainer className="run">
          <IconContainer>
            <FaRunning />
          </IconContainer>
          <p className="colored">Running</p>
          <p>{runMins} minutes</p>
        </InfoContainer>
        <InfoContainer className="cycle">
          <IconContainer>
            <FaBicycle />
          </IconContainer>
          <p className="colored">Cycling</p>
          <p>{cycleMins} minutes</p>
        </InfoContainer>
      </div>
    </React.Fragment>
  )
}

export default CalorieBurnInfo
