import React, {useEffect} from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import Nav from "./nav";
import MobileMenu from "./menu";
import MainLogo from "./logo";

const Header = ({ state }) => {

  useEffect(() => {
    if (window.scrollY > 50) {
      state.stickyHeader = true;
    } else {
      state.stickyHeader = false;
    }
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        state.stickyHeader = true;
      } else {
        state.stickyHeader = false;
      }
    });
  }, []);

  return (
    <HeaderBar className={state.stickyHeader ? 'sticky' : ''}>
      <div>
        <div className="brand-spacer"></div>
        <BrandContainer>
          <div className="logo">
            <Link link="/" aria-label="Homepage">
              <MainLogo />
            </Link>
          </div>
          <MobileMenu />
        </BrandContainer>
        <Nav />
      </div>
    </HeaderBar>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const HeaderBar = styled.div`
  width: 100%;
  > div {
    max-width: 1280px;
    margin: auto;
    position: relative;
    display: flex;
    z-index: 1;
    justify-content: space-between;
    .nav-container {
      a {
          color: var(--typography-secondary);
          &:hover, &:focus, &:active {
            color: var(--typography-action);
          }
          &[aria-current="page"] {
            color: var(--white);
          }
       }
       .widget-list-link {
          .filler {
            fill: var(--typography-action)
          }
        }
     }
  }
  @-webkit-keyframes enlarge-small {
    0% {
       height: 50px;
       width: 50px;
    }
    100% {
       height: 60px;
       width: 60px;
    }
  }     
  @keyframes enlarge-small {
    0% {
       height: 50px;
       width: 50px;
    }
    100% {
       height: 60px;
       width: 60px;
    }
  }
  @-webkit-keyframes iconize-small {
    0% {
       height: 60px;
       width: 60px;
    }
    100% {
       height: 50px;
       width: 50px;
    }
  }     
  @keyframes iconize-small {
    0% {
       height: 60px;
       width: 60px;
    }
    100% {
       height: 50px;
       width: 50px;
    }
  }
  @-webkit-keyframes enlarge {
    0% {
       height: 50px;
       width: 50px;
    }
    100% {
       height: 100px;
       width: 100px;
    }
  }     
  @keyframes enlarge {
    0% {
       height: 50px;
       width: 50px;
    }
    100% {
       height: 100px;
       width: 100px;
    }
  }
  @-webkit-keyframes iconize {
    0% {
       height: 100px;
       width: 100px;
    }
    100% {
       height: 50px;
       width: 50px;
    }
  }     
  @keyframes iconize {
    0% {
       height: 100px;
       width: 100px;
    }
    100% {
       height: 50px;
       width: 50px;
    }
  }
  .logo {
    @media (min-width: 768px) {
      -webkit-animation: enlarge 500ms;
      -moz-animation:    enlarge 500ms;
      -ms-animation:     enlarge 500ms;
      -o-animation:      enlarge 500ms;
      animation:         enlarge 500ms;
    }
    @media (max-width: 767px) {
      -webkit-animation: enlarge-small 500ms;
      -moz-animation:    enlarge-small 500ms;
      -ms-animation:     enlarge-small 500ms;
      -o-animation:      enlarge-small 500ms;
      animation:         enlarge-small 500ms;
    }
  }
  &.sticky {
    background: var(--light-brand);
    .widget-list-link {
      svg {
        .filler {
          fill: var(--brand) !important;
        }
      }
      &:hover {
        svg {
          .filler {
            fill: var(--typography-action) !important;
          }  
        }
      }
    }
    .nav-container {
      a {
        color: var(--brand);
        &:hover, &:focus, &:active {
          color: var(--typography-action);
        }
        &[aria-current="page"] {
          color: var(--typography-action);
        }
      }
     }
    .logo {
      width: 50px;
      height: 50px;
      a {
        background: transparent;
        .main-logo {
          .background {
            fill: var(--light-brand);
          }
          .picture {
            fill: var(--brand);
          }
        }
     }
      @media (min-width: 768px) {
        -webkit-animation: iconize 500ms;
        -moz-animation:    iconize 500ms;
        -ms-animation:     iconize 500ms;
        -o-animation:      iconize 500ms;
        animation:         iconize 500ms;
      }
      @media (max-width: 767px) {
        -webkit-animation: iconize-small 500ms;
        -moz-animation:    iconize-small 500ms;
        -ms-animation:     iconize-small 500ms;
        -o-animation:      iconize-small 500ms;
        animation:         iconize-small 500ms;
      }
    }
  }
`;
const BrandContainer = styled.div`
  box-sizing: border-box;
  color: var(--black);
  background: var(--white);
  margin-bottom: 50px;
  width: 100%;
  .logo {
    position: absolute;
    left: 0px;
    top: 0px;
    background: transparent;
    width: 60px;
    height: 60px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      outline-offset: 0px;
      outline: 0px;
      padding: 10px;
      background: var(--brand);
      border-radius: 100%;
      .main-logo {
        width: 100%;
        height: 100%;
        display: block;
        .background {
          fill: var(--brand);
        }
      }
      &:hover {
        .main-logo {
          .picture {
            fill: var(--typography-action);
          }
        }
      }
    }
    @media (min-width: 768px) {
      width: 100px;
      height: 100px;
      .main-logo {
        width: 100px;
        height: 100px;
      }
    }
  }
  @media (min-width: 768px) {
    display: flex;
    width: auto;
    margin-bottom: 50px;
  }
`;
