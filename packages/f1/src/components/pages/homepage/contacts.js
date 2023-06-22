import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import parse from 'html-react-parser';
import HpSectionTitle from "./section-title";

const HpContacts = ({ state, content }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    const sectionTitleClasses = "position-right";

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <Section className="hp-section-content">
            <HpSectionTitle title={content['title']} className={sectionTitleClasses}/>
            {parse(content['text'])}
            <a className="primary-button" href={content['cta-email']}>{content['cta-text']}</a>
        </Section>
    ) : null;
};

export default connect(HpContacts);

const Section = styled.div`
  
`;
