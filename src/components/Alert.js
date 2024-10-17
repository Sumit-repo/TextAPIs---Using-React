import React from "react";

export default function Alert(props) {
  return (
    <div style={{ height: "60px" }} className="mt-3">
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.type}</strong> : {props.alert.message}
        </div>
      )}
    </div>
  );
}
