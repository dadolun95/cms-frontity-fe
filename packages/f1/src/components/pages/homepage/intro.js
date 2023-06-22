import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import parse from 'html-react-parser';
import ReactTypingEffect from 'react-typing-effect';

const HpIntro = ({ state, content }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <Section className="hp-section-content">
            <div>
                <div>
                    {content['message']}<br/>
                    <h1>
                        <ReactTypingEffect
                            text={[content['name'], "Dadolun"]}
                        />
                    </h1>
                    {parse(content['text'])}
                    <a className="primary-button" href={content['cta-email']}>{content['cta-text']}</a>
                </div>
            </div>
        </Section>
    ) : null;
};

export default connect(HpIntro);

const Section = styled.div`
  h1 {
    font-size: 2rem;
    @media (min-width: 768px) {
      font-size: 5rem;
    }
  }
  h2 {
    font-size: 1.5rem;
    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }
`;
