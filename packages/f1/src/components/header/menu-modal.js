import React from "react";
import { styled, connect } from "frontity";
import Link from "../link";
import Switch from "@frontity/components/switch";
import {AnchorLink} from "react-anchor-navigation";

const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const data = state.source.get(state.router.link);
  const isThereLinks = menu != null && menu.length > 0;

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        {isThereLinks &&
          menu.map(([name, link]) => {
            return (
            <Switch key={name}>
              <MenuLink
                  link={link}
                  when={link.indexOf("#") === -1 || data.isHome}
                  aria-current={state.router.link === link ? "page" : undefined}
              >
                  {name}
              </MenuLink>
              <AnchorLink when={link.indexOf("#") !== -1} href={link} className="menu-link" activeClassName="active">
                  {name}
              </AnchorLink>
            </Switch>
          );
        })}
      </MenuContent>
    </>
  );
};

const MenuOverlay = styled.div`
  background-color: var(--brand);
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

const MenuContent = styled.div`
  z-index: 3;
  display:flex;
  flex-direction: column;
  width: 100%;
  .menu-link {
    width: 100%;
    outline: 0;
    font-size: 20px;
    text-align: center;
    padding: 1.2rem 0;
    color:var(--white);
    display: block;
    position: relative;
    z-index: 999;
    transition: all 0.3s ease 0s;
    &:hover,
    &:focus {
      color:var(--typography-action);
      background-color: rgba(0, 0, 0, 0.05);
    }
    /* styles for active link */
    &[aria-current="page"] {
      color: var(--typography-action);
      font-weight: bold;
    }
  }
`;

const MenuLink = styled(Link)`
  width: 100%;
  outline: 0;
  font-size: 20px;
  text-align: center;
  padding: 1.2rem 0;
  color:var(--white);
  display: block;
  position: relative;
  z-index: 999;
  transition: all 0.3s ease 0s;
  &:hover,
  &:focus {
    color:var(--typography-action);
    background-color: rgba(0, 0, 0, 0.05);
  }
  /* styles for active link */
  &[aria-current="page"] {
    color: var(--typography-action);
    font-weight: bold;
  }
`;

export default connect(MenuModal);
