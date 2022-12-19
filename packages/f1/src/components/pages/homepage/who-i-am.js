import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import HpSectionTitle from "./section-title";

const HpWhoIAm = ({ state, content }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    const sectionTitleClasses = "position-left";

    const media = content['photo'];
    media.sizeData = {};
    for (const [key, value] of Object.entries(media.sizes)) {
        if (key.indexOf('width') === -1 && key.indexOf('height') === -1) {
            media.sizeData[key] = {
                'width': media.sizes[key + '-width'],
                'height': media.sizes[key + '-height'],
                'source_url': value
            };
        }
    }
    const srcset =
        Object.values(media.sizeData)
            // Get the url and width of each size.
            .map((item) => [item.source_url, item.width])
            // Recude them to a string with the format required by `srcset`.
            .reduce(
                (final, current, index, array) =>
                    final.concat(
                        `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
                    ),
                ""
            ) || null;


    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <Section className="hp-section-content">
            <HpSectionTitle title={content['title']} className={sectionTitleClasses}/>
            <div className="content">
                <div className="text">{ReactHtmlParser(content['text'])}</div>
                <div className="image">
                    <img
                        alt="Dadolun"
                        src={media.url}
                        srcSet={srcset}
                        loading="lazy"
                        width="450px"
                        height="450px"
                    />
                </div>
            </div>
        </Section>
) : null;
};

export default connect(HpWhoIAm);

const Section = styled.div`
  .content {
    display: flex;
    flex-wrap: wrap;
    .text {
      width: 100%;
      @media (min-width: 768px) {
         width: 60%;
      }
    }
    .image {
      width: 100%;
      @media (min-width: 768px) {
         width: 40%;
         padding-left: 20px;
         padding-right: 20px;
      }
      > img {
        margin-top: 30px;
        border-radius: 30px;
        box-shadow: 0 5px 15px rgb(0 0 0 / 20%);
        max-width: 100%;
        height: auto;
        @media (min-width: 768px) {
          margin-top: 0px;
        }
      }
    }
  }
`;
