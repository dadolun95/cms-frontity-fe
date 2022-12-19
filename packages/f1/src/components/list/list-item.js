import React from "react";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import FeaturedMedia from "../media/featured-media";
import { Trans } from 'react-i18next';

/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */
const Item = ({ state, item }) => {
  const date = new Date(item.date);

  return (
    <>
      <Article>
      {state.theme.featured.showOnList && (
          <div className="media-content">
            <FeaturedMedia id={item.featured_media} />
          </div>
      )}
      <div className="content">

          <Link className="article-title" aria-label={item.title.rendered} link={item.link}>
            <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
          </Link>
          <div className="bio-info">
              {/* If the post has an author, we render a clickable author text. */}
              <PublishDate>
                  {" "}
                  <Trans i18nKey="published on" /> {date.toLocaleDateString(['it'])}
              </PublishDate>
          </div>

          {/* If the post has an excerpt (short summary text), we render it */}
          {item.excerpt && (
            <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
          )}
          <Link className="primary-button" aria-label={item.title.rendered} link={item.link}><Trans i18nKey="Read more ..." /></Link>
      </div>
      </Article>
    </>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);
const Article = styled.article`
  margin:0 auto;
  position: relative;
  margin-bottom:3.5rem;
  display: block;
  @media (min-width: 768px) {
    display: flex;
  }
  .primary-button {
    box-shadow: none;
    border: solid 2px var(--brand);
    color: var(--brand);
    &:hover {
      background: var(--brand);
      color: var(--white);
    }
  }
  .media-content {
    padding-right: 0px;
    width: 100%;
    @media (min-width: 768px) {
      padding-right: 30px;
       width: 50%;
    }
  }
  .content {
    width: 100%;
    @media (min-width: 768px) {
       width: 50%;
    }
    .article-title {  
      h1 { 
        color: var(--brand); 
      }
      &:hover {
        h1 {
          color:var(--typography-action);
        }
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom:1.5rem;
  color: var(--brand);
  box-sizing: border-box;
  transition: all .3s ease;
`;

const AuthorName = styled.span`
  color: var(--brand);
  font-size: 1rem;
  margin-right:1rem;
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const PublishDate = styled.span`
  color: var(--brand);
  font-weight: bold;
  font-size: 0.875rem;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
  color: var(--typography-bold);
`;
