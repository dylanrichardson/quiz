import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CenteredRow, PageContainer } from '../styles';
import { JoinQuiz } from '../components';
import { createQuiz } from '../actions';

const HomePage = ({ createQuiz, isCreating, error }) => {
  const [showError, setShowError] = useState(!!error);

  return (
    <PageContainer>
      <CenteredRow>
        <Button
          style={{ width: '35%', minWidth: '100px', maxWidth: '188px' }}
          onClick={createQuiz}
          disabled={isCreating}
        >
          {isCreating ? 'Loading...' : 'Create Quiz'}
        </Button>
        {showError && (
          <CenteredRow className="mt-3">
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
            >
              {error}
            </Alert>
          </CenteredRow>
        )}
      </CenteredRow>
      <CenteredRow>
        <JoinQuiz />
      </CenteredRow>
    </PageContainer>
  );
};

const mapStateToProps = ({ quiz: { isCreating, error } }) => {
  return {
    isCreating,
    error
  };
};

export default connect(
  mapStateToProps,
  { createQuiz }
)(HomePage);
