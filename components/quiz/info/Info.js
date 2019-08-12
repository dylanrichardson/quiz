import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Pin, MembersSidebar, MembersModal, Home } from './';
import { CenteredRow } from '@styles';

const EXTRA_SMALL = 374;
const SMALL = 466;
const MEDIUM = 622;

export const Info = ({
  isMobile,
  width,
  showTitle,
  members,
  leader,
  name,
  pin
}) => {
  const xs =
    width < EXTRA_SMALL ? 6 : width < SMALL ? 5 : width < MEDIUM ? 4 : 3;

  const marginLeft = `${xs === 3 ? 100 / 8 : 0}%`;

  return isMobile ? (
    xs < 5 ? (
      <Row style={{ marginTop: '-5vh', paddingTop: '10px', width: '100%' }}>
        <Col xs={xs} style={{ paddingLeft: '10px' }}>
          <Pin pin={pin} isMobile={isMobile} />
        </Col>
        <Col xs={xs} style={{ marginLeft }}>
          <Home pin={pin} />
        </Col>
        <Col xs={xs} style={{ paddingRight: '10px', marginLeft }}>
          <MembersModal members={members} leader={leader} name={name} />
        </Col>
      </Row>
    ) : (
      <>
        <Row style={{ marginTop: '-5vh', paddingTop: '10px', width: '100%' }}>
          <Col xs={12}>
            <Home pin={pin} />
          </Col>
        </Row>
        <Row style={{ paddingTop: '10px', width: '100%' }}>
          <Col xs={xs} style={{ paddingLeft: '10px' }}>
            <Pin pin={pin} />
          </Col>
          <Col
            xs={{ span: xs, offset: 2 * (6 - xs) }}
            style={{ paddingRight: '10px' }}
          >
            <MembersModal members={members} leader={leader} name={name} />
          </Col>
        </Row>
      </>
    )
  ) : (
    <Col xs={3} xl={2} style={{ zIndex: 1 }}>
      {!showTitle && (
        <CenteredRow style={{ marginBottom: '30px' }}>
          <Home pin={pin} style={{ minWidth: '140px' }} />
        </CenteredRow>
      )}
      <CenteredRow style={{ marginBottom: '30px' }}>
        <Pin pin={pin} style={{ minWidth: '140px' }} />
      </CenteredRow>
      <CenteredRow>
        <MembersSidebar
          members={members}
          leader={leader}
          name={name}
          style={{ minWidth: '140px' }}
        />
      </CenteredRow>
    </Col>
  );
};
