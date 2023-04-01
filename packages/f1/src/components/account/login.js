import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Cookies from "universal-cookie";

const LoginPage = ({ state, actions }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    useEffect(() => {
        actions.theme.checkAuthStatus(state).then(function () {
            if (state.theme.isLoggedIn) {
                actions.theme.redirect('/account');
            }
        });
    });

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    /**
     * Form onSubmit event handler.
     *
     * @param {Object} event Event.
     */
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        state.auth = {
            email: email,
            password: password
        };
        await actions.theme.logIn(state);
    };

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <LoginPageContainer>
            <Content>
                <div className="post-title">
                    <Title dangerouslySetInnerHTML={{ __html: 'Login' }} />
                </div>
                <div>
                    <FormElement method="POST" onSubmit={ handleOnSubmit }>
                        <input name="email" type="email" value={email || ""} placeholder="john.doe@gmail.com" onChange={e => SetEmail(e.target.value)} />
                        <input name="password" type="password" value={password || ""} onChange={e => SetPassword(e.target.value)} />
                        <input type="submit" value="Login" />
                    </FormElement>
                </div>
            </Content>
        </LoginPageContainer>
    ) : null;
};

export default connect(LoginPage);

const LoginPageContainer = styled.div`
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
