import React, {useEffect, useState} from "react";
import { connect, styled } from "frontity";
import List from "../list";

const LogoutPage = ({ state, actions, libraries }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    useEffect(() => {
        actions.theme.logout(state);
    }, []);

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <LogoutPageContainer>
            <Content>
                <div className="post-title">
                    <Title dangerouslySetInnerHTML={{ __html: 'Logout' }} />
                </div>
            </Content>
        </LogoutPageContainer>
    ) : null;
};

export default connect(LogoutPage);

const LogoutPageContainer = styled.div`
  width:100%;
  list-style: none;
  background: var(--white);
`;

const Title = styled.h1`
  margin-bottom: 3.2rem;
`;

const FormElement = styled.form``;

const Content = styled.div`
  padding-top: 80px;
  padding-right: 15px;
  padding-left: 15px;
  * {
    max-width: 1280px;
    width: 100%;
    margin:0 auto;
  }
}`;
