import React, { useState } from 'react';
import { Collapse, Card, Container, Row, Col } from 'react-bootstrap';
import { MembersList } from './';

export const MembersSidebar = ({ leader, members, name, style = {} }) => {
  const [open, setOpen] = useState(true);

  return (
    <Card style={style}>
      <Card.Header
        onClick={() => setOpen(!open)}
        aria-controls="members"
        aria-expanded={open}
      >
        <Container>
          <Row>
            <Col style={{ padding: '0px' }}>Active</Col>
            <Col xs={1}>
              <i
                className={`fas fa-chevron-circle-${
                  open ? 'up' : 'down'
                } align-middle`}
                style={{ fontSize: '20px' }}
              />
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Collapse in={open}>
        <MembersList members={members} leader={leader} name={name} />
      </Collapse>
    </Card>
  );
};
