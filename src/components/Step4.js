import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Step4 = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const answers = useSelector((state) => state);
  const [mimeError, setMimeError] = useState(false);

  const onSubmit = async (data) => {
    const ALLOWED_MIME_TYPE = ["image/jpeg", "image/png"];
    if (!ALLOWED_MIME_TYPE.includes(data.picture[0].type)) {
      setMimeError(true);
    } else {
      const answerRes = await fetch("http://localhost:4000/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...answers,
          comment: data.comment,
          age: data.age,
        }),
      }).then((res) => res.json());

      const { id } = answerRes;
      const formData = new FormData();
      formData.append("id", id);
      formData.append("picture", data.picture[0]);
      console.log(data.picture[0]);

      await fetch("http://localhost:4000/picture", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      history.push("./result");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>One last thing...</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail" required>
              <Form.Label>Upload your picture</Form.Label>
              <Form.Control
                type="file"
                ref={register({ required: true })}
                name="picture"
              />
              {mimeError && <p>this file type is not allowed</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Please put your age</Form.Label>
              <Form.Control
                type="number"
                ref={register({ required: true })}
                name="age"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Any Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                ref={register({ required: true })}
                name="comment"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Complete
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
