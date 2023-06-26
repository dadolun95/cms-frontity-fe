import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header/header";
import Footer from "./footer/footer";
import List from "./list";
import Post from "./post";
import Page from "./pages/page";
import HomePage from "./pages/homepage";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import BootstrapCss from './styles/bootstrap.css';
import gutenbergStyle from "./styles/gutenberg/style.css";
import Ubuntu from './styles/fonts/Ubuntu/Ubuntu-Regular.ttf';
import Roboto from './styles/fonts/Roboto/Roboto-Regular.ttf';

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  useEffect(() => {
      let script = document.createElement('script');
      script.src = "/static/iubenda.js";
      script.type = "text/javascript";
      document.head.appendChild(script);
      script = document.createElement('script');
      script.src = "//cdn.iubenda.com/cs/gpp/stub.js";
      script.type = "text/javascript";
      document.head.appendChild(script);
      script = document.createElement('script');
      script.src = "//cdn.iubenda.com/cs/iubenda_cs.js";
      script.type = "text/javascript";
      script.async = true;
      document.head.appendChild(script);
      return () => {
          document.head.removeChild(script);
      }
  }, []);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="it" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only
      global HTML tags. */}
      <Global styles={css(BootstrapCss)} />
      <Global styles={css(gutenbergStyle)} />
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <HomePage when={data.isHome} />
          <List when={data.isArchive} />
          <Page when={data.isPage} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>
      <FooterContainer>
        <Footer/>
      </FooterContainer>
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  @font-face {
      font-family: "Ubuntu";
      font-style: normal;
      font-weight: normal;
      font-display: fallback;
      src: url("${Ubuntu}") format("truetype");
  }
  @font-face {
      font-family: "Roboto";
      font-style: normal;
      font-weight: normal;
      font-display: fallback;
      src: url("${Roboto}") format("truetype");
  }
  :root {
    --brand: #0b172a;
    --dark-brand: #091322;
    --light-brand: #edf1fa;
    --black: #333333;
    --white: #ffffff;
    --bodycolor: #0b172a;
    --typography-main: #d4dcf7;
    --typography-bold: #4d505c;
    --typography-secondary: #8f98b3;
    --typography-action: #66f7d4;
    --typography-alert: #ff8964;
  }
  body {
    margin: 0;
    color:var(--bodycolor);
    font-family: Ubuntu, "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-feature-settings: "kern";
    -webkit-font-smoothing: antialiased;
    min-height: -webkit-fill-available;
    background-color:var(--brand);
    color: var(--typography-secondary);
  }
  html {
    height: -webkit-fill-available;
  },
  a,
  a:visited {  
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    color:var(--black);
    font-family: Roboto, "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
  }
  h1 {
    font-size: 5rem;
    color: var(--typography-main);
  }
  h2 {
    font-size: 3rem;
    color: var(--typography-secondary);
  }
  h3 {
    font-size: 2.5rem;
    color: var(--typography-action);
  }
  a {
    color: var(--typography-action);
  }
  p {
    line-height:24px;
    font-size:18px;
  }
  .container {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
  }
  .primary-button {
    margin-top: 1rem;
    padding: 1rem;
    display: block;
    width: fit-content;
    background: transparent;
    text-transform: uppercase;
    border: solid 2px var(--typography-action);
    color: var(--typography-action);
    box-shadow: 0 5px 15px rgb(0 0 0 / 20%);
    &:hover {
      background: var(--typography-action);
      color: var(--brand);
    }
  }
  .section{
    padding: 34px 0;
    @media (min-width: 992px) {
      padding: 50px 0;
    }
  }
`;

const HeadContainer = styled.div`
  display: flex;
  position: sticky;
  z-index: 100;
  top: 0;
  width:100%;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0px;;
`;
const FooterContainer = styled.div`
  width:100%;
  background:var(--brand);
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
