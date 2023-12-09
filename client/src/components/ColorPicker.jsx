import React, { useState } from "react";

export default function ColorPicker({ setColor }) {
  const [selected, setSelected] = useState(0);
  return (
    <div>
      <button
        style={{
          backgroundColor: "#2D9596",
          marginLeft: 5,
          border: selected === 0 ? "2px solid black" : "2px solid transparent",
        }}
        className="colorPicker"
        onClick={() => {
          setSelected(0);
          setColor("#2D9596");
        }}
      ></button>
      <button
        style={{
          backgroundColor: "#962e2d",
          marginLeft: 5,
          border: selected === 1 ? "2px solid black" : "2px solid transparent",
        }}
        className="colorPicker"
        onClick={() => {
          setSelected(1);
          setColor("#962e2d");
        }}
      ></button>
      <button
        style={{
          backgroundColor: "#962d95",
          marginLeft: 5,
          border: selected === 2 ? "2px solid black" : "2px solid transparent",
        }}
        className="colorPicker"
        onClick={() => {
          setSelected(2);
          setColor("#962d95");
        }}
      ></button>
      <button
        style={{
          backgroundColor: "#2d9663",
          marginLeft: 5,
          border: selected === 3 ? "2px solid black" : "2px solid transparent",
        }}
        className="colorPicker"
        onClick={() => {
          setSelected(3);
          setColor("#2d9663");
        }}
      ></button>
    </div>
  );
}
