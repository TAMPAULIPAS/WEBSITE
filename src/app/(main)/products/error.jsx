"use client";
import styles from "./page.module.css";

function error(params) {
  return <div className="iop">{params.error.message}</div>;
}

export default error;
