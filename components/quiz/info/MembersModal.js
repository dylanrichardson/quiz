import React, { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { MembersList } from './';

export const MembersModal = ({ leader, members, name }) => {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <>
      <Card>
        <Card.Header
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => setShowMembers(!showMembers)}
        >
          <span style={{ verticalAlign: 'text-top' }}>
            {members.length} Active
          </span>
        </Card.Header>
      </Card>
      <Modal
        show={showMembers}
        onHide={() => setShowMembers(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{
              width: '100%',
              textAlign: 'center',
              paddingLeft: '46.02px'
            }}
          >
            Active Members
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MembersList members={members} leader={leader} name={name} />
        </Modal.Body>
      </Modal>
    </>
  );
};
