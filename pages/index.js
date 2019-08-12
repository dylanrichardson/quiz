import React from 'react';
import { CenteredRow, PageContainer } from '@styles';
import { JoinQuiz, CreateQuiz } from '@components/home';

export default () => {
  return (
    <PageContainer>
      <CenteredRow>
        <CreateQuiz />
      </CenteredRow>
      <CenteredRow>
        <JoinQuiz />
      </CenteredRow>
    </PageContainer>
  );
};
