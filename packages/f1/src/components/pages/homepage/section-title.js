import React, { useEffect } from "react";
import { connect, styled } from "frontity";

const HpSectionTitle = ({ state, title, className }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <Section className="hp-section-content-title">
            <div className={className}>
                <h3>{title}</h3>
            </div>
        </Section>
) : null;
};

export default connect(HpSectionTitle);

const Section = styled.div`
  
`;
