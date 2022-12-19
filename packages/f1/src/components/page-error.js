import React from "react";
import { styled, connect } from "frontity";
import Square1 from "./media/background-square-1.png";
import Square2 from "./media/background-square-2.png";
import Link from "./link";
import { Trans } from 'react-i18next';

const description404 = (
  <>
    <Trans i18nKey="Page not found" />{" "}
    <span role="img" aria-label="confused face">
      😕
    </span>
    <br/>
    <Trans i18nKey="Don't worry! Return to the site homepage" /> <Link className="widget-list-link" link="/"><Trans i18nKey="here" /></Link>.<br/>
    <Trans i18nKey="If you whould read something interesting, search among the articles of the" /> <Link className="widget-list-link" link="/blog/"><Trans i18nKey="blog" /></Link> <Trans i18nKey="where I write news about magento, development stories and my past experiences." />
  </>
);

// The 404 page component
const Page404 = ({ state }) => {

  return (
    <Container>
        <div className="container">
            <Title><Trans i18nKey="Oops! 404" /></Title>
            <Description>{description404}</Description>
            <div className="hp-background-cube hp-cube-first">
                <img src={Square1} alt="square 1" width="600" height="600" className="el-image" loading="eager" />
            </div>
            <div className="hp-background-cube hp-cube-second">
                <img src={Square2} alt="square 2" width="1100" height="1100" className="el-image" loading="eager" />
            </div>
            <div className="hp-background-cube hp-cube-third">
                <img src={Square1} alt="square 1" width="600" height="600" className="el-image" loading="eager" />
            </div>
            <div className="hp-background-cube hp-cube-fourth">
                <img src={Square2} alt="square 2" width="1100" height="1100" className="el-image" loading="eager" />
            </div>
        </div>
    </Container>
  );
};

export default connect(Page404);

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 50px 0px;
  text-align: center;
  overflow: hidden;
  background: var(--light-brand);
  @media (min-width: 768px) {
    padding: 300px 0px;
  }
  &.light {
    background: var(--light-brand);
    &:before {
        position: absolute;
        top: 0px;
        left: 33%;
        content: "";
        display: block;
        width: 67%;
        height: 8px;
        background-color: var(--typography-action);
        z-index:10;
    }
    &:after {
        position: absolute;
        bottom: 0px;
        right: 33%;
        content: "";
        display: block;
        width: 67%;
        height: 8px;
        background-color: var(--typography-action)
    }
    .hp-section-content-title {
      h3 {
        color: var(--brand);
      }
    }
  }
  .hp-background-cube {
    position: absolute;
    &.hp-cube-first {
      left: -5vw;
      top: 5vh;
      z-index: 0;
    }
    &.hp-cube-second {
      right: 5vw;
      top: -25vw;
      z-index: 0;
    }
    &.hp-cube-third {
      right: 5vw;
      top: 20vh;
      z-index: 0;
    }
    &.hp-cube-fourth {
      left: -2vw;
      top: 20vh;
      z-index: 0;
    }
}
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--brand);
  font-size: 4em;
  z-index: 1;
  position: relative;
`;

const Description = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
  margin: 24px 0;
  color: var(--brand);
  z-index: 1;
  position: relative;
`;
