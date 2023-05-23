import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert, Form, Button } from "react-bootstrap";
import { getCategories, getMessages, postMessage } from "./reducers/actions";
import { Category, InicioMdStt, Message } from "./types";
import logo from "../../logo.svg";
import "./index.css";

// Usar cuando se tengar propiedades de entrada.
// interface Props {
//   state: { counter: number };
// }

const MdInicio = () => {
  // Select elements from State
  const stt = useSelector((sttSelector: any) => sttSelector.mdInicio);
  console.log("STT:", stt);

  const TEST_USER = { user_code: 3, user_name: "Pruebas" };

  const {
    error = undefined,
    loading = false,
    categories = undefined,
    messageSubmitted = false,
    messages = undefined,
  }: InicioMdStt = { ...stt };

  const [validated, setValidated] = useState(false);
  const [categorySelected, setCategory] = useState(0);
  const [messageSelected, setMessage] = useState();

  let errMess;

  // Revisar funcionalidad del EndPoint
  const categoriesOptions = !categories
    ? undefined
    : categories.map((c: Category) => (
        <option key={c.category_code} value={c.category_code}>
          {c.category_name}
        </option>
      ));

  /* Obtenemos el dispatcher por medio del hook y no de los parametros
   * de entrada de la función para hacer un códico más limpio.
   * >> Get the dispatch from the Hook. */
  const dispatch = useDispatch();

  /* Activa los mensajes de error del módulo.
   * >> Show the error message stored to this module. */
  const [showErr, setShowErr] = useState(true);
  const [showSucc, setShowSucc] = useState(true);

  useEffect(() => {
    if (error) setShowErr(true);
  }, [error]);

  useEffect(() => {
    if (!!categories) {
      if (!categorySelected) {
        setCategory(categories[0].category_code);
      }
      return;
    }
    dispatch(getCategories(TEST_USER.user_code));
  }, [TEST_USER.user_code, dispatch, categories]);

  useEffect(() => {
    if (!!messages) return;
    dispatch(getMessages(TEST_USER.user_code));
  }, [TEST_USER.user_code, dispatch, messages]);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (
      form.checkValidity() === true &&
      !!categorySelected &&
      !!messageSelected
    ) {
      const newMessage: Message = {
        category: { category_code: categorySelected },
        message: messageSelected,
        userPortal: TEST_USER,
      };
      dispatch(postMessage(newMessage));
    }

    setValidated(true);
  };

  const rowSuccess = messageSubmitted ? (
    <Row>
      <Col>
        <Alert
          variant="success"
          show={showSucc}
          onClose={() => setShowSucc(false)}
          transition={false}
          dismissible
        >
          Message Submitted.
        </Alert>
      </Col>
    </Row>
  ) : undefined;

  const rowError = error ? (
    <Row>
      <Col>
        <Alert
          variant="danger"
          show={showErr}
          onClose={() => setShowErr(false)}
          transition={false}
          dismissible
        >
          <div dangerouslySetInnerHTML={{ __html: error! }}></div>
        </Alert>
      </Col>
    </Row>
  ) : null;

  const messagesRow = !messages
    ? undefined
    : messages
        .sort((a, b) => {
          const bmCode = !!b.message_code ? b.message_code : 0;
          const amCode = !!a.message_code ? a.message_code : 0;
          return bmCode - amCode;
        })
        .map((m: Message) => (
          <Row
            key={"r" + m.message_code}
            className={"log_history_row " + m.category.category_name}
          >
            <Col xs="auto" md="auto" className="id">
              {m.message_code}
            </Col>
            <Col xs="auto" md="auto" className="cat">
              {m.category.category_name}
            </Col>
            <Col xs="auto" md="auto" className="mess">
              {m.message}
            </Col>
          </Row>
        ));

  const messageRowTitle = !messages ? undefined : (
    <Row>
      <Col className="log_history">Log history</Col>
    </Row>
  );

  const handleMessage = (event: any) => {
    setMessage(event.target.value);
  };

  const handleCategory = (event: any) => {
    setCategory(event.target.value);
  };

  return (
    <div className="App">
      <Container fluid>
        <Row className="header">
          <Col xs="auto">
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
          <Col className="myName">
            EDGAR BECERRA
            <br />
            <b>https://www.linkedin.com/in/albedi/</b>
          </Col>
        </Row>

        <Row>
          <Col className="title_element">Submission Form</Col>
        </Row>
        {rowError}
        {rowSuccess}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col xs="auto" md="auto">
                <Form.Label>Category:</Form.Label>
                <Form.Control
                  as="select"
                  size="lg"
                  onChange={handleCategory}
                  value="categorySelected"
                >
                  {categoriesOptions}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  onChange={handleMessage}
                  value={messageSelected}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid message.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col className="submitButton">
                <Button type="submit">Submit form</Button>
              </Col>
            </Row>
            <Row>
              <Col>{errMess}</Col>
            </Row>
          </Form.Group>
        </Form>
        {messageRowTitle}
        {messagesRow}
        {!!loading ? <h3>LOADING</h3> : undefined}
      </Container>
    </div>
  );
};

export default MdInicio;
