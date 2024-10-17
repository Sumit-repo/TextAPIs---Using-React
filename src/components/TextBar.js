import React, { useState } from "react";

export default function TextBar(props) {
  var dummyText = "Enter Text Here";
  const [text, setText] = useState("Enter Text Here");

  const onClickUpper = () => {
    setText(text.toUpperCase());
    if (text.trim().length > 0)
      props.showAlert("Converted to uppercase", "success");
    else
      props.showAlert("Please enter your text before proceeding!", "warning");
  };

  const onClickLower = () => {
    setText(text.toLowerCase());
    if (text.trim().length > 0)
      props.showAlert("Converted to lowercase", "success");
    else
      props.showAlert("Please enter your text before proceeding!", "warning");
  };

  const onChangeFunction = (event) => {
    setText(event.target.value);
  };

  const onClickClear = (event) => {
    setText(dummyText);
    if (text.trim().length > 0) props.showAlert("Text area erazed", "success");
    else
      props.showAlert("Please enter your text before proceeding!", "warning");
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
    if (text.trim().length > 0)
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    else
      props.showAlert("Please enter your text before proceeding!", "warning");
  };

  const wordCount = (text) =>
    text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
  const charCount = (text) => text.replace(/\s/g, "").length;
  const minutesToRead = (text) => 0.008 * wordCount(text);

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
          Word Count: {wordCount(text)} <br />
          Characters Count: {charCount(text)} <br />
          Minutes to read: {minutesToRead(text)}
        </p>
      </div>
    </>
  );
}
