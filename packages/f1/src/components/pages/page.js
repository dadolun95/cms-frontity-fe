import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import List from "../list";

const Page = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  // Get the data of the post.
  const page = state.source[data.type][data.id];

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

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
    <ArticleContainer>
      <div className="post-title">
        <Title dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      </div>

      {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
      <Content>
        <Html2React html={page.content.rendered} />
      </Content>
    </ArticleContainer>
  ) : null;
};

export default connect(Page);

const ArticleContainer = styled.div`
  width:100%;
  .post-title {
    text-align:center;    
  }
`;

const Title = styled.h1`
  margin-bottom: 3.2rem;
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  word-break: break-word;  
  
  * {
    max-width: 1280px;
    width: 100%;
    margin:0 auto;
  }

  p {
    margin-bottom:1.5rem;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom:1.8rem;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    // width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: 0 auto;
  }

  blockquote {
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }
  .wp-block-button, .wp-block-code, .wp-block-preformatted {
    width:auto;
    margin-bottom:2rem;
  }
  .wp-block-button__link {
    color:var(--white);
  }
  .wp-block-embed {
    max-width: 100%;
    position: relative;
    width: 100%;
    margin: 1.5rem auto;
    .wp-block-embed__wrapper {
      &::before {
        content: "";
        display: block;
        padding-top: 56.25%;
      }
    }
    iframe {
      max-width: 100%;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border: 0;
    }
  }
  @media (max-width: 992px) {
    .wp-block-columns {
      padding-left: 15px;
      padding-right:15px;
    }    
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    width:100%;
    height: 3rem;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: var(--white);
    background-color:var(--brand);
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
