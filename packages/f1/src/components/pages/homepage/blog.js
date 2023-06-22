import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import parse from 'html-react-parser';
import HpSectionTitle from "./section-title";

const HpBlog = ({ state, content }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    const sectionTitleClasses = "position-left";

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <Section className="hp-section-content">
            <HpSectionTitle title={content['title']} className={sectionTitleClasses}/>
            <div>{parse(content['text'])}</div>
        </Section>
    ) : null;
};

export default connect(HpBlog);

const Section = styled.div`
  
`;
