import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Result = () => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:4000/answers", {
        method: "GET",
      }).then((res) => res.json());
      setResults(res.data);
    };
    getData();
  }, []);

  const displayQ1 = () => {
    const dict = {};
    for (const r of results) {
      if (dict[r["q1"]]) {
        dict[r["q1"]]++;
      } else {
        dict[r["q1"]] = 1;
      }
    }
    const maxKey = Object.keys(dict).reduce((a, b) =>
      dict[a] > dict[b] ? a : b
    );
    const maxVal = dict[maxKey];
    const percent = Math.floor((maxVal / results.length) * 100);
    return (
      <div className="stat">
        <p className="h1">{percent}%</p>
        <p> of respondents was {maxKey === "no" ? "not" : ""} Vegetarian</p>
      </div>
    );
  };

  const displayQ2 = () => {
    const dict = {};
    for (const r of results) {
      if (dict[r["q2"]]) {
        dict[r["q2"]]++;
      } else {
        dict[r["q2"]] = 1;
      }
    }
    const maxKey = Object.keys(dict).reduce((a, b) =>
      dict[a] > dict[b] ? a : b
    );
    const maxVal = dict[maxKey];
    const percent = Math.floor((maxVal / results.length) * 100);
    return (
      <div className="stat">
        <p className="h1">{percent}%</p>
        <p> of respondents liked {maxKey}</p>
      </div>
    );
  };

  const displayQ3 = () => {
    const dict = {};
    for (const r of results) {
      for (const i of r["q3"]) {
        if (dict[i]) {
          dict[i]++;
        } else {
          dict[i] = 1;
        }
      }
    }
    const maxKey = Object.keys(dict).reduce((a, b) =>
      dict[a] > dict[b] ? a : b
    );
    const maxVal = dict[maxKey];
    const percent = Math.floor((maxVal / results.length) * 100);
    return (
      <div className="stat">
        <p className="h1">{percent}%</p>
        <p> of respondents liked {maxKey}</p>
      </div>
    );
  };

  const displayCards = () => {
    let res = [];
    for (const r of results) {
      res.push(
        <div key={r._id} className="col-lg-4 col-md-6">
          <div className="card mb-4">
            <img className="card-img-top" src={r.picture} alt="avatar" />
            <div className="card-body">
              <h5 className="card-title">Age: {r.age}</h5>
              <p className="card-text">
                {r.comment.length > 180
                  ? `${r.comment.substring(0, 180)}...`
                  : r.comment}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return <div className="row mt-4">{res}</div>;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">{results.length !== 0 && displayQ1()}</div>
        <div className="col-lg-4">{results.length !== 0 && displayQ2()}</div>
        <div className="col-lg-4">{results.length !== 0 && displayQ3()}</div>
      </div>

      {results.length !== 0 && displayCards()}

      <div className="row">
        <div className="col-lg-4">
          <Link className="btn btn-primary my-4" to="/">
            Start over
          </Link>
        </div>
      </div>
    </div>
  );
};
