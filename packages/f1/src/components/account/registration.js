import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";

const RegistrationPage = ({ state, actions, libraries }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);

    useEffect(() => {
        actions.theme.checkAuthStatus(state).then(function () {
            if (state.theme.isLoggedIn) {
                actions.theme.redirect('/account');
            }
        });
    });


    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");

    /**
     * Form onSubmit event handler.
     *
     * @param {Object} event Event.
     */
    const handleOnSubmit = async (event) => {
        if (password !== confirmPassword) {
            alert("Error password confirmation is wrong, write same as password field");
        } else {
            event.preventDefault();
            state.auth = {
                name: name,
                email: email,
                password: password,
                passwordConfirmation: confirmPassword
            };
            await actions.theme.register(state);
        }
    };

    // Load the post, but only if the data is ready.
    return data.isReady ? (
        <RegistrationPageContainer>
            <Content>
                <div className="post-title">
                    <Title dangerouslySetInnerHTML={{ __html: 'Registration' }} />
                </div>
                <div>
                    <FormElement method="POST" onSubmit={ handleOnSubmit }>
                        <input name="name" type="text" value={name || ""} placeholder="John Doe" onChange={e => SetName(e.target.value)} />
                        <input name="email" type="email" value={email || ""} placeholder="john.doe@gmail.com" onChange={e => SetEmail(e.target.value)} />
                        <input name="password" type="password" value={password || ""} onChange={e => SetPassword(e.target.value)} />
                        <input name="confirm_password" type="password" value={confirmPassword || ""} onChange={e => SetConfirmPassword(e.target.value)} />
                        <input type="submit" value="Register" />
                    </FormElement>
                </div>
            </Content>
        </RegistrationPageContainer>
    ) : null;
};

export default connect(RegistrationPage);

const RegistrationPageContainer = styled.div`
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
