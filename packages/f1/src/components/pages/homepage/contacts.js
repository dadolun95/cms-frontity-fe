import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import HpSectionTitle from "./section-title";
import Link from "../../link";

const HpContacts = ({ state, content }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    const sectionTitleClasses = "position-right";

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <Section className="hp-section-content">
            <HpSectionTitle title={content['title']} className={sectionTitleClasses}/>
            {ReactHtmlParser(content['text'])}
            <Link className="primary-button" link="/contatti/" aria-label={content['cta-text']}>{content['cta-text']}</Link>
        </Section>
    ) : null;
};

export default connect(HpContacts);

const Section = styled.div`
  
`;
