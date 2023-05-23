import React from "react";
import { GoAlert } from "react-icons/go";
import { Props } from "./types";
//import "./index.css";

const Player = ({ query, item }: Props) => {
  if (!query) return null;
  if (!item)
    return (
      <div>
        <GoAlert />
        &nbsp; No video was found
      </div>
    );
  return (
    <div className="player">
      <div className="docs">
        <div className="group">
          <h1>{item.snippet.title}</h1>
          <h2>{item.snippet.description}</h2>
        </div>
        <h3>{item.snippet.channelTitle}</h3>
      </div>
    </div>
  );
};

export default Player;
