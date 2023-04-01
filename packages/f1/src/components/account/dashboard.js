import React, { useEffect } from "react";
import Cookies from 'universal-cookie';
import {connect, styled} from "frontity";
const cookies = new Cookies();

const AccountDashboardPage = ({ state, actions }) => {

    useEffect(() => {
        actions.theme.checkAuthStatus(state).then(function () {
            if (!state.theme.isLoggedIn) {
                actions.theme.redirect('/login');
            }
        });
    });

    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <AccountDashboardPageContainer>
            <Content>
                <div className="post-title">
                    <Title dangerouslySetInnerHTML={{ __html: 'Account' }} />
                </div>
                <div>

                </div>
            </Content>
        </AccountDashboardPageContainer>
    ) : null;
};

export default connect(AccountDashboardPage);

const AccountDashboardPageContainer = styled.div`
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
