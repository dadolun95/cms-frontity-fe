import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import GithubSvg from "../media/githubSvg";
import LinkedinSvg from "../media/linkedinSvg";
import { Trans } from 'react-i18next';

const Footer = ({ state }) => {
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-12 col-lg-6 footer-widget widget-one">
            <ul className="widget-list d-flex">
              <li className="social-link">
                <Link className="widget-list-link" target="_blank" rel="nofollow noopener" aria-label="Github" link="https://github.com/dadolun95">
                    <GithubSvg />
                </Link>
              </li>
              <li className="social-link">
                <Link className="widget-list-link" target="_blank" rel="nofollow noopener" aria-label="Linkedin" link="https://www.linkedin.com/in/davide-lunardon-b78813a1/">
                    <LinkedinSvg />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 footer-widget widget-two">
            <ul className="widget-list links">
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Log In')}} link="/login"><Trans i18nKey="Log In" /></Link></li>
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Log In')}} link="/register"><Trans i18nKey="Register" /></Link></li>
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Log Out')}} link="/logout"><Trans i18nKey="Log Out" /></Link></li>
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Log Out')}} link="/account"><Trans i18nKey="Account Dashboard" /></Link></li>
            </ul>
            <ul className="widget-list links">
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Who i am')}} link="/#chi-sono/"><Trans i18nKey="Who i am" /></Link></li>
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Work')}} link="/#lavoro"><Trans i18nKey="Work" /></Link></li>
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Blog')}} link="/blog"><Trans i18nKey="Blog" /></Link></li>
              <li><Link className="widget-list-link" aria-label={(t, { i18n }) => {t('Contacts')}} link="/#contatti"><Trans i18nKey="Contacts" /></Link></li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Footer);

const Container = styled.footer`
  max-width:1200px;
  margin: 0 auto;
  padding: 4rem 15px;
  color: var(--white);
  .social-link {
    margin-right: 30px;
  }
  .footer-widget {
    margin-bottom: 1rem;
    p {
      font-size: 1rem;
    }
    .widget-list {
      list-style: none;
      padding-left: 0;
      display: flex;
      flex-wrap: wrap;
      &.links {
        flex-flow: row-reverse;
      }
      li {
        margin-bottom: 0.5rem;
        padding-right: 20px;
        .widget-list-link {
          text-decoration: none;
          transition: all 0.3s ease;
          color: var(--typography-secondary);
          &:hover {
            color: var(--typography-action);
          }
        }
      }
    }
  }
  .widget-one {
    p {
      @media (min-width: 992px) {
        padding-right: 8rem;
      }
    }
  }
  .widget-two {
      .widget-list.links {
        @media (min-width: 768px) {
          margin-left: auto;
          flex-flow: row-reverse;
        }
        margin-left: 0px;
        margin-right: auto;
        flex-flow: row;
      }
    }
  }
}
`;
