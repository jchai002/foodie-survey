import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { q1Answer } from "../rootSlice";
import { Form, Button } from "react-bootstrap";

export const Step1 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const q1 = useSelector((state) => state.q1);
  const { register, handleSubmit } = useForm({ defaultValues: q1 });
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    if (!data.answer) {
      setError(true);
    } else {
      dispatch(q1Answer(data.answer));
      history.push("./step2");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Are you Vegetarian?</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Check
                type="radio"
                label="yes"
                ref={register}
                name="answer"
                value="yes"
              />
              <Form.Check
                type="radio"
                label="no"
                ref={register}
                name="answer"
                value="no"
              />
            </Form.Group>
            {error && <p>please choose answer</p>}
            <Button type="submit">Next</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
