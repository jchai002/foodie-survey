import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { q3Answer } from "../rootSlice";

export const Step3 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const q3 = useSelector((state) => state.q3);
  const { register, handleSubmit } = useForm({ defaultValues: { q3 } });
  const [error, setError] = useState(false);

  const onSubmit = (data) => {
    if (!data.answer.length) {
      setError(true);
    } else {
      dispatch(q3Answer(data.answer));
      history.push("./step4");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Which dessert do you love?</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="ice-cream"
                ref={register}
                name="answer"
                value="ice-cream"
              />
              <Form.Check
                type="checkbox"
                label="brownie"
                ref={register}
                name="answer"
                value="brownie"
              />
              <Form.Check
                type="checkbox"
                label="cookie"
                ref={register}
                name="answer"
                value="cookie"
              />
              <Form.Check
                type="checkbox"
                label="pudding"
                ref={register}
                name="answer"
                value="pudding"
              />
            </Form.Group>
            {error && <p>please choose at least 1 answer</p>}
            <Button type="submit">Next</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
