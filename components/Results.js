import React, { useState, useEffect } from 'react';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';
import * as d3 from 'd3';
import { CenteredRow } from '../styles';
import { Voters } from './';

const WIDTH_RATIO = 0.6;
const MOBILE_WIDTH_RATIO = 0.8;
const HEIGHT_RATIO = 0.3;
const LABEL_LINE_HEIGHT = 67;
const MOBILE_WIDTH = 768;
const MAX_LABEL_SIZE = 50;
const MIN_LABEL_SIZE = 15;

const svgDefs = `
  <defs>
    <pattern
      id="pattern-stripe"
      width="14"
      height="1"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <rect width="8" height="1" transform="translate(0,0)" fill="white"></rect>
    </pattern>
    <mask id="mask-stripe">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-stripe)"
      />
    </mask>
  </defs>
`;

function wrapLabel(words, width) {
  var text = d3.select(this),
    words = words.split(/\s+/).reverse(),
    word,
    line = [],
    lineNumber = 0,
    lineHeight = 1.1,
    y = text.attr('y'),
    dy = parseFloat(text.attr('dy')),
    tspan = text
      .text(null)
      .append('tspan')
      .attr('x', 0)
      .attr('y', y)
      .attr('dy', dy + 'em');
  while ((word = words.pop())) {
    line.push(word);
    tspan.text(line.join(' '));
    if (line.length > 1 && tspan.node().getComputedTextLength() > width) {
      line.pop();
      tspan.text(line.join(' '));
      line = [word];
      tspan = text
        .append('tspan')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', ++lineNumber * lineHeight + dy + 'em')
        .text(word);
    }
  }
}

export const Results = ({ answers, showResults, width, height }) => {
  const [labelLines, setLabelLines] = useState(1);

  const values = _.sortBy(
    _.entries(_.countBy(_.values(answers))).map(([x, y]) => ({
      x,
      y
    })),
    'x'
  );

  const showChart = showResults && values.length > 0;

  const wrap = (text, width) => {
    text.each(function(_, index) {
      wrapLabel.call(this, values[index].x, width);
    });

    const lines = _.max(_.map(text[0], 'childNodes.length'));

    setLabelLines(lines);
  };

  useEffect(() => {
    if (showChart) {
      const barWidth = 138 / _.keys(answers).length + 18;

      d3.selectAll('g.x.axis .tick text').call(wrap, barWidth);

      if (!document.querySelector('#results svg defs')) {
        document
          .querySelector('#results svg')
          .insertAdjacentHTML('afterbegin', svgDefs);
      }
    }
  });

  const numTicks = _.max(_.map(values, 'y'));

  const chartWidth =
    width < MOBILE_WIDTH ? width * MOBILE_WIDTH_RATIO : width * WIDTH_RATIO;
  const chartHeight =
    height * HEIGHT_RATIO + (labelLines - 1) * LABEL_LINE_HEIGHT;

  const horizontalMargin = chartWidth * 0.1;
  const verticalMargin = chartHeight * 0.05;

  const labelSizes = _.map(values, ({ x }) =>
    Math.max(Math.min(200 / x.length, MAX_LABEL_SIZE), MIN_LABEL_SIZE)
  );

  const labelSizesCSS = labelSizes
    .map(
      (size, n) => `g.x.axis g:nth-of-type(${n + 1}) text {
      font-size: ${size}px;
    }`
    )
    .join(' ');

  const textFill = window.getComputedStyle(
    document.getElementsByTagName('body')[0]
  ).color;

  return (
    showChart && (
      <CenteredRow id="results">
        <Voters answers={answers} values={_.map(values, 'x')} />
        <BarChart
          data={{ values }}
          width={chartWidth}
          height={chartHeight}
          margin={{
            top: verticalMargin,
            bottom: verticalMargin * 5,
            left: horizontalMargin,
            right: horizontalMargin
          }}
          yAxis={{ tickArguments: [numTicks] }}
          sort={d3.ascending}
        />
        <style>
          {labelSizesCSS}
          {`
          .bar {
            fill: var(--primary);
            mask: url(#mask-stripe);
          }

          text {
            fill: ${textFill};
          }

          g.x.axis text {
            font-family: "Cabin Sketch", cursive;
            font-weight: 300;
          }
          `}
        </style>
      </CenteredRow>
    )
  );
};
