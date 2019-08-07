import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Row, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../reducers/store';
import { LoadingApp, LoadingPage } from '../components';

const TITLE_MIN_WIDTH = 830;
const TITLE_MIN_HEIGHT = 440;

const QuizUI = class extends App {
  constructor(props) {
    super(props);

    this.state = {
      loadingPage: true,
      loadingApp: true,
      width: props.width,
      height: props.height,
      showTitle: false
    };
  }

  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
      width: (!ctx.req && window.innerWidth) || TITLE_MIN_WIDTH,
      height: (!ctx.req && window.innerHeight) || TITLE_MIN_HEIGHT
    };
  }

  routeChangeStart = () => {
    this.setState({ loadingPage: true });
  };

  routeChangeEnd = () => {
    this.setState({ loadingPage: false, loadingApp: false });
  };

  routeChangeError = () => {
    console.error('error loading page');
  };

  updateWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({
      width,
      height,
      showTitle: width > TITLE_MIN_WIDTH && height > TITLE_MIN_HEIGHT
    });
  };

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);

    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeError);

    this.setState({ loadingPage: false, loadingApp: false });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);

    Router.events.off('routeChangeStart', this.routeChangeStart);
    Router.events.off('routeChangeComplete', this.routeChangeEnd);
    Router.events.off('routeChangeError', this.routeChangeError);
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const { loadingPage, loadingApp, showTitle } = this.state;

    return (
      <Container>
        <Head>
          <title>Quizjob</title>
        </Head>
        <Provider store={store}>
          {showTitle && (
            <Row
              style={{
                position: 'absolute',
                top: '15px',
                left: '35px',
                zIndex: '1'
              }}
            >
              <Col>
                <Link href="/">
                  <a style={{ textDecoration: 'none' }}>
                    <h1 className="display-4">
                      <span style={{ color: 'var(--green)' }}>Quiz</span>
                      <span style={{ fontWeight: 600 }}>job</span>
                    </h1>
                  </a>
                </Link>
              </Col>
            </Row>
          )}
          {loadingApp ? (
            <LoadingApp />
          ) : loadingPage ? (
            <LoadingPage />
          ) : (
            <Component {...pageProps} {...this.state} />
          )}
        </Provider>
      </Container>
    );
  }
};

export default withRedux(makeStore)(QuizUI);
