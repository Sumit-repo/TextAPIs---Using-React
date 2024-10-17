import React, { useState } from "react";

export default function TextBar(props) {
  var dummyText = "Enter Text Here";
  const [text, setText] = useState("Enter Text Here");

  const onClickUpper = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase", "success");
  };

  const onClickLower = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to lowercase", "success");
  };

  const onChangeFunction = (event) => {
    setText(event.target.value);
  };

  const onClickClear = (event) => {
    setText(dummyText);
    props.showAlert("Text area erazed", "success");
  };

  const onClickDomainExtract = (event) => {
    var domains = new Set();

    text
      .split(" ")
      .map((e) => e.split("@")[1])
      .filter((e) => e && e.endsWith(".com"))
      .forEach((e) => domains.add(e.trim()));

    setText([...domains].join(" \n"));
    if (domains.size !== 0) props.showAlert("Generated domains", "success");
    else props.showAlert("No domain is present in the given text", "warning");
  };

  const onClickSpeak = () => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  return (
    <>
      <div className="container my-3">
        <div className="mb-3">
          <h2>{props.title}</h2>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            value={text}
            onChange={onChangeFunction}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={onClickUpper}>
          Convert to UpperCase
        </button>
        <button className="btn btn-primary mx-3" onClick={onClickLower}>
          Convert to LowerCase
        </button>
        <button className="btn btn-primary" onClick={onClickClear}>
          Clear
        </button>
        <button className="btn btn-primary mx-3" onClick={onClickDomainExtract}>
          Extract Domain
        </button>
        <button className="btn btn-primary" onClick={onClickSpeak}>
          Speak
        </button>
      </div>
      <div className="container my-3">
        <h3>Your text summary</h3>
        <p>
          Word Count: {text.trim().split(" ").length} <br />
          Characters Count: {text.trim().length} <br />
          Minutes to read: {0.008 * text.trim().split(" ").length}
        </p>
      </div>
    </>
  );
}
