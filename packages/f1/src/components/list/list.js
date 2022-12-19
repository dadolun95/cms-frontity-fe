import React from "react";
import { connect, styled, decode } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  let title = 'Blog';

  return (
      <Container>
          <div className="container">
            {/* If the list is a blog posts, we render a title. */}
            {data.isPostArchive && (
                <Header>
                  {title}
                </Header>
            )}
            {/* If the list is a taxonomy, we render a title. */}
            {data.isTaxonomy && (
                <Header>
                  {data.taxonomy}:{" "}
                  <b>{decode(state.source[data.taxonomy][data.id].name)}</b>
                </Header>
            )}

            {/* If the list is for a specific author, we render a title. */}
            {data.isAuthor && (
                <Header>
                  Author: <b>{decode(state.source.author[data.id].name)}</b>
                </Header>
            )}
            <>
              {data.items.map(({ type, id }) => {
                const item = state.source[type][id];
                // Render one Item component for each one.
                return <Item key={item.id} item={item} />;
              })}
            </>
            <Pagination />
          </div>
      </Container>
  );
};

export default connect(List);

const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  padding-top: 80px;
  padding-right: 15px;
  padding-left: 15px;
  list-style: none;
  background: var(--white);
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom:3rem;
  color: var(--brand);
  text-align: left;
`;
