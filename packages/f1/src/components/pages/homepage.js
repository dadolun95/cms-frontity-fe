import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import List from "../list";
import HpIntro from "./homepage/intro";
import HpWhoIAm from "./homepage/who-i-am";
import HpWork from "./homepage/work";
import HpBlog from "./homepage/blog";
import HpContacts from "./homepage/contacts";
import Square1 from '../media/background-square-1.png';
import Square2 from '../media/background-square-2.png';
import {
    AnchorProvider,
    AnchorSection
} from "react-anchor-navigation";

export function useHashFragment(offset = 0, trigger = true) {
    useEffect(() => {
        const scrollToHashElement = () => {
            const { hash } = window.location;
            const elementToScroll = document.getElementById(hash?.replace("#", ""));

            if (!elementToScroll) return;

            window.scrollTo({
                top: elementToScroll.offsetTop - offset,
                behavior: "smooth"
            });
        };

        if (!trigger) return;

        scrollToHashElement();
        window.addEventListener("hashchange", scrollToHashElement);
        return window.removeEventListener("hashchange", scrollToHashElement);
    }, [trigger]);
}

const HomePage = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  // Get the data of the post.
  const homepage = state.source[data.type][data.id];

  const introSectionContent = {
      'message': homepage.acf["hp-intro-hello"],
      'name': homepage.acf["hp-intro-name"],
      'text': homepage.acf["hp-intro-text"],
      'cta-text': homepage.acf["hp-intro-cta"],
      'cta-email': "mailto:" + homepage.acf["hp-intro-cta-email"]
  };

  const whoIAmSectionContent = {
    'title': homepage.acf["hp-0-title"],
    'text': homepage.acf["hp-0-text"],
    'photo': homepage.acf["hp-0-photo"],
    'photo-alt': homepage.acf["hp-intro-name"]
  };

  const workSectionContent = {
    'title': homepage.acf["hp-1-title"],
    'tabs': [
        {
            'title': homepage.acf["hp-1-subtitle-0"],
            'content': homepage.acf["hp-1-text-0"]
        },
        {
            'title': homepage.acf["hp-1-subtitle-1"],
            'content': homepage.acf["hp-1-text-1"]
        },
        {
            'title': homepage.acf["hp-1-subtitle-2"],
            'content': homepage.acf["hp-1-text-2"]
        }
    ]
  };

  const blogSectionContent = {
    'title': homepage.acf["hp-2-title"],
    'text': homepage.acf["hp-2-text"]
  };

  const contactsSectionContent = {
    'title': homepage.acf["hp-3-title"],
    'text': homepage.acf["hp-3-text"],
    'cta-text': homepage.acf["hp-3-cta-text"],
    'cta-email': "mailto:" + homepage.acf["hp-3-cta-email"]
  };

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, []);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Content>
      <AnchorProvider>
          <div className="intro hp-section">
            <HpIntro content={introSectionContent} />
          </div>
          <div className="who-i-am hp-section hp-section-background light">
              <AnchorSection id="chi-sono" className="anchor" />
              <div className="hp-background-cube hp-cube-first">
                  <img src={Square1} alt="square 1" width="600" height="600" className="el-image" loading="eager" />
              </div>
              <div className="hp-background-cube hp-cube-second">
                  <img src={Square2} alt="square 2" width="1100" height="1100" className="el-image" loading="eager" />
              </div>
              <div className="hp-background-cube hp-cube-third">
                  <img src={Square1} alt="square 3" width="600" height="600" className="el-image" loading="eager" />
              </div>
              <div className="hp-background-cube hp-cube-fourth">
                  <img src={Square2} alt="square 4" width="1100" height="1100" className="el-image" loading="eager" />
              </div>
            <HpWhoIAm content={whoIAmSectionContent} />
          </div>
          <div className="work hp-section">
              <AnchorSection className="anchor" id="lavoro"/>
              <HpWork content={workSectionContent} />
          </div>
          <div className="blog hp-section hp-section-background light">
              <div className="hp-background-cube hp-cube-first">
                  <img src={Square1} alt="square " width="600" height="600" className="el-image" loading="eager" />
              </div>
              <div className="hp-background-cube hp-cube-second">
                  <img src={Square2} alt="square 6" width="1100" height="1100" className="el-image" loading="eager" />
              </div>
            <HpBlog content={blogSectionContent} />
          </div>
         <div className="contacts hp-section">
            <AnchorSection id="contatti" className="anchor"/>
            <HpContacts content={contactsSectionContent} />
          </div>
      </AnchorProvider>
    </Content>
  ) : null;
};

export default connect(HomePage);

const Content = styled.div`
    width: 100%;
    position:relative;
    .hp-section {
      position: relative;
      overflow: hidden;
      .hp-section-content-title {
        h3 {
          color: var(--typography-main);
          margin-bottom: 50px;
        }
      }
      &.hp-section-background {
        overflow:hidden;
        background: var(--light-brand);
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
      }
      .hp-section-content {
          margin-top: 80px;
          margin-bottom: 80px;
          padding: 2rem;
          max-width: 1280px;
          position:relative;
          margin-left: auto;
          margin-right: auto
      }
      .hp-section-content-title {
        position:relative;
        margin-top: 20px;
        margin-bottom: 20px;
        .position-left {
          position: relative;
          margin-right: auto;
          display: block;
          width: fit-content;
          &:after {
            @media (min-width: 767px) {
              position: absolute;
              width: 30vw;
              bottom: -10px;
              left: calc(100% + 5px - 30vw);
            }
            margin-top: -50px;
            content: "";
            display: block;
            width: 100%;
            height: 4px;
            background-color: var(--typography-action)
          }
        }
        .position-right {
          position: relative;
          margin-left: auto;
          display: block;
          width: fit-content;
          &:after {
            @media (min-width: 767px) {
              position: absolute;
              width: 30vw;
              bottom: -10px;
              right: calc(100% + 5px - 30vw);
            }
            margin-top: -50px;
            content: "";
            display: block;
            width: 100%;
            height: 4px;
            background-color: var(--typography-action)
          }
        }
      }
    }
    .intro {
      margin-top: -50px;
      margin-bottom: 50px;
      @media (min-width: 768px) {
        margin-top: 150px;
        margin-bottom: 150px;
      }
    }
`;
