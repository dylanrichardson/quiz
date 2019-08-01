import React from 'react';
import { Spinner } from 'react-bootstrap';
import { PageContainer, CenteredRow } from '../styles';

export const LoadingPage = () => (
  <PageContainer>
    <CenteredRow>
      <Spinner animation="border" variant="primary" />
    </CenteredRow>
  </PageContainer>
);
