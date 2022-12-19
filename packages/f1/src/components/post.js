import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import List from "./list";
import FeaturedMedia from "./media/featured-media";
import { Trans } from 'react-i18next';

const Post = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const date = new Date(post.date);

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

  return data.isReady ? (
    <ArticleContainer>
      <div className="post-title container">
        {data.isPost && (
          <DateWrapper>
            {" "}
            <Trans i18nKey="published on" /> <b>{date.toLocaleDateString(['it'])}</b>
          </DateWrapper>
        )}
        <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </div>

      {state.theme.featured.showOnPost && (
        <FeaturedMedia id={post.featured_media} />
      )}

      <Content>
          <div className="container post-content">
              <Html2React html={post.content.rendered} />
          </div>
      </Content>
    </ArticleContainer>
  ) : null;
};

export default connect(Post);

const ArticleContainer = styled.div`
  width:100%;
  margin: 0;
  padding: 80px 0px;
  overflow: hidden;
  background: var(--white);
  position: relative;
  .post-title {
    position: relative;
    z-index: 1;
  }
`;

const Title = styled.h1`
  margin-bottom: 1.2rem;
  color: var(--brand);
  font-size: 3rem;
  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const DateWrapper = styled.p`
  color: var(--brand);
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2em;
  display: block;
  float: none;
  @media (min-width: 768px) {
    float: right;
    font-size: 0.9em;
    margin-bottom: 0px;
    color: var(--brand);
  }
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  word-break: break-word;
  position: relative;
  z-index: 1;

  p {
    margin-bottom:1.5rem;
    color: var(--typography-bold);
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
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
  
  .wp-block-code {
    border-radius: 0px;
    background: var(--light-brand);
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
  a {
    color: var(--brand);
    text-decoration: underline;
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
    background-color:var(--white);
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
