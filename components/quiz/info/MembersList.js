import React from 'react';
import {
  ListGroup,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

export const MembersList = ({ leader, members, name, ...props }) => {
  return (
    <ListGroup variant="flush" id="members" {...props}>
      {members.map(member => (
        <ListGroup.Item key={member} active={member === name}>
          <Container>
            <Row>
              <Col style={{ padding: '0px' }}>{member}</Col>
              {member === leader && (
                <Col xs={1}>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Quiz Maker</Tooltip>}
                  >
                    <i
                      className="fas fa-crown align-middle"
                      style={{ fontSize: '16px' }}
                    />
                  </OverlayTrigger>
                </Col>
              )}
            </Row>
          </Container>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
