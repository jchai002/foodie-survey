import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { q2Answer } from "../rootSlice";

export const Step2 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const q2 = useSelector((state) => state.q2);
  const { register, handleSubmit } = useForm({ defaultValues: { q2 } });
  const [error, setError] = useState(false);

  const onSubmit = (data) => {
    if (!data.answer) {
      setError(true);
    } else {
      dispatch(q2Answer(data.answer));
      history.push("./step3");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>What's your favorite protein</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Check
                type="radio"
                label="beef"
                ref={register}
                name="answer"
                value="beef"
              />
              <Form.Check
                type="radio"
                label="chicken"
                ref={register}
                name="answer"
                value="chicken"
              />
              <Form.Check
                type="radio"
                label="tofu"
                ref={register}
                name="answer"
                value="tofu"
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
