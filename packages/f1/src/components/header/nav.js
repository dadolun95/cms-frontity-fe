import React from "react";
import { connect, styled } from "frontity";
import {
  AnchorLink
} from "react-anchor-navigation";
import Switch from "@frontity/components/switch";
import Link from "../link";
import GithubSvg from "../media/githubSvg";
import LinkedinSvg from "../media/linkedinSvg";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state }) => (
  <NavContainer className="nav-container">
    {state.theme.menu.map(([name, link]) => {
      // Check if the link matched the current page url
      return (
        <NavItem key={name}>
            {/* If link url is the current page, add `aria-current` for a11y */}
          <Switch>
            <Link when={link.indexOf("#") === -1} aria-label={name} link={link}>
              {name}
            </Link>
            <AnchorLink when={link.indexOf("#") !== -1} aria-label={name} href={link} activeClassName="active">
              {name}
            </AnchorLink>
          </Switch>
        </NavItem>
      );
    })}
    <Link className="widget-list-link" target="_blank" rel="nofollow noopener" aria-label="Github" link="https://github.com/dadolun95">
      <GithubSvg />
    </Link>
    <Link className="widget-list-link" target="_blank" rel="nofollow noopener" aria-label="Linkedin" link="https://www.linkedin.com/in/davide-lunardon-b78813a1/">
      <LinkedinSvg />
    </Link>
  </NavContainer>
);

export default connect(Nav);

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 24px;
  margin: 0;
  overflow-x: auto;
  @media screen and (max-width: 768px) {
    display: none;
  }
  .widget-list-link {
    margin-left: 20px;
  }
`;

const NavItem = styled.div`
  padding: 0;
  margin: 0 16px;
  color: var(--brand);
  font-size: 0.9em;
  box-sizing: border-box;
  flex-shrink: 0;
  font-weight: bold;

  & > a {
    display: inline-block;
    line-height: 2em;
    color:var(--black);
    transition: all 0.3s ease;
    /* Use for semantic approach to style the current link */
    &[aria-current="page"] {
      color:var(--brand);
    }
    &:hover {
      color:var(--brand);
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;

    &:after {
      content: "";
      display: inline-block;
      width: 24px;
    }
  }
`;
