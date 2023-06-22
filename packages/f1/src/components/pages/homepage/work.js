import React, {useEffect, useState} from "react";
import { connect, styled } from "frontity";
import parse from 'html-react-parser';
import HpSectionTitle from "./section-title";

const HpWork = ({ state, content }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    const sectionTitleClasses = "position-right";

    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = (index) => setActiveIndex(index);
    const checkActive = (index, className) => activeIndex === index ? className : "";

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <Section className="hp-section-content">
            <HpSectionTitle title={content['title']} className={sectionTitleClasses}/>
            <div className="content">
                <div className="tabs">
                    {content['tabs'].map((tab, index)=> (
                        <div key={index} className={`tab ${checkActive(index, "active")}`} onClick={() => handleClick(index)}>{tab['title']}</div>
                    ))}
                </div>
                <div className="panels">
                    {content['tabs'].map((tab, index)=> (
                        <div key={index} className={`panel ${checkActive(index, "active")}`}>
                            {parse(tab['content'])}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    ) : null;
};

export default connect(HpWork);

const Section = styled.div`
.content {
  width: 100%;
  display: inline-block;
  @media (min-width: 768px) {
     display: flex;
  }
}
.tabs {  
  width: 100%; 
  display: flex;
  @media (min-width: 768px) {
     width: 120px;  
     display: inline-block;
  }
}
.panels {  
  height: 70vh;  
  @media (min-width: 768px) {
     height: 30vh;
  }
}
.tab {  
  width: 33%;  
  text-align: center;
  @media (min-width: 768px) {
     width: 120px;  
     text-align: left;
  }
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  padding: 10px 10px;
  color: var(--typography-secondary);
  cursor: pointer;
}
.tab.active {
  font-weight: bold;
  @media (min-width: 768px) {
     border-left: solid 2px var(--typography-action);
     border-bottom: 0px;
  }
  border-bottom: solid 2px var(--typography-action);
  color: var(--typography-main);
}
.panel {
  position: absolute;
  padding: 10px;
  transition: opacity .5s cubic-bezier(.42, 0, .34, 1.01);
  opacity: 0;
}
.panel.active {
   opacity: 1;
}
`;
