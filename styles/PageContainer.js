import React from 'react';
import { CenteredContainer } from './';

export const PageContainer = ({
  children,
  height = '100vh',
  verticalPadding = '25vh',
  fluid = true
}) => {
  return (
    <CenteredContainer
      fluid={fluid}
      height={height}
      verticalpadding={verticalPadding}
    >
      {children}
    </CenteredContainer>
  );
};
