import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Results } from './results';
import { Info } from './info';
import { Ask, ToggleResults } from './leader';
import { Answer } from './member';
import { Question } from './common';
import { PageContainer, CenteredContainer, CenteredRow } from '@styles';

const SMALL = 466;
const MEDIUM = 768;
const EXTRA_LARGE = 1200;

const CenteredCol = styled(Col)`
  height: 80%;

  @media (min-width: ${MEDIUM}px) {
    margin-left: -25vw;
  }

  @media (min-width: ${SMALL}px) {
    height: 100%;
  }

  @media (min-width: ${EXTRA_LARGE}px) {
    margin-left: ${-100 / 6}vw;
  }
`;

export const Quiz = ({
  pin,
  members,
  leader,
  name,
  answers,
  answer,
  question,
  showResults,
  width,
  height,
  showTitle
}) => {
  const ownAnswer = answers[name];
  const isLeader = leader === name;
  const isMobile = width < MEDIUM;

  members.sort();

  return (
    <PageContainer verticalPadding="5vh">
      <CenteredRow className="align-items-center" style={{ height: '100%' }}>
        <Info
          isMobile={isMobile}
          width={width}
          members={members}
          leader={leader}
          name={name}
          pin={pin}
          showTitle={showTitle}
        />
        <CenteredCol>
          <CenteredContainer>
            <Question question={question} />
            <Ask pin={pin} isLeader={isLeader} isMobile={isMobile} />
            <Answer
              pin={pin}
              name={name}
              question={question}
              isLeader={isLeader}
              ownAnswer={ownAnswer}
              isMobile={isMobile}
            />
            <ToggleResults
              pin={pin}
              isLeader={isLeader}
              showResults={showResults}
              question={question}
            />
            <Results
              answers={answers}
              answer={answer}
              name={name}
              showResults={showResults}
              width={width}
              height={height}
            />
          </CenteredContainer>
        </CenteredCol>
      </CenteredRow>
    </PageContainer>
  );
};
