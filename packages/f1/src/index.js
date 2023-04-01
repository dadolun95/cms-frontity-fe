import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import links from "./processor/links";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Cookies from 'universal-cookie';
import enTranslations from "./components/i18n/en_US.json";
import itTranslations from "./components/i18n/it_IT.json";
import {useConnect} from "frontity";

i18n
.use(initReactI18next)
.init({
  resources: {
    en: {
      translation: enTranslations
    },
    it: {
      translation: itTranslations
    }
  },
  fallbackLng: "it",
  interpolation: {
    escapeValue: false
  }
});

const cookies = new Cookies();

const AccountSignInHandler = {
  pattern: "/login/",
  func: ({ state }) => {
    state.source.data["/login/"].isSignIn = true;
  }
};
const AccountDashboardHandler = {
  pattern: "/account/",
  func: ({state}) => {
    state.source.data["/account/"].isAccountDashboard = true;
    if (state.theme.isLoggedIn) {
      state.source.data["/account/"].isLoggedIn = true;
    } else {
      state.source.data["/account/"].isLoggedIn = false;
    }
  }
};
const AccountRegistrationHandler = {
  pattern: "/register/",
  func: ({ state }) => {
    state.source.data["/register/"].isRegistration = true;
  }
};
const AccountLogoutHandler = {
  pattern: "/logout/",
  func: ({ state }) => {
    state.source.data["/logout/"].isLogout = true;
  }
};

const awsminF1 = {
  name: "@awsmin/f1",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      }
    },
  },
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      init: ({ libraries }) => {
        libraries.source.handlers.push(AccountSignInHandler);
        libraries.source.handlers.push(AccountDashboardHandler);
        libraries.source.handlers.push(AccountRegistrationHandler);
        libraries.source.handlers.push(AccountLogoutHandler);
      },
      redirect: ({ state, actions }) => (path) => {
        actions.router.set(path);
      },
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      getCsrfCookie:  async ({ state }) => {
        await fetch(
            `${state.source.url}/sanctum/csrf-cookie`,
            {
              method: 'GET',
              withCredentials: true,
              headers: {
                Accept: 'application/json',
              }
            }
        );
      },
      checkAuthStatus: async ({ state, actions }) => {
        if (typeof cookies.get('token') !== 'undefined') {
          if ( state.theme.isLoggedIn === false || typeof state.theme.isLoggedIn === 'undefined') {
            await actions.theme.getCsrfCookie(state);
            const response = await fetch(
                `${state.source.url}/api/status`,
                {
                  method: 'POST',
                  headers: {
                    withCredentials: true,
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`,
                  }
                }
            );
            const status = await response.json();
            if (typeof status.success === 'undefined' || !status.success) {
              state.theme.isLoggedIn = false;
            } else {
              state.theme.isLoggedIn = status.data.loggedIn;
            }
          }
        } else {
          state.theme.isLoggedIn = false;
        }
      },
      logIn: async ({state, actions}) => {
        await actions.theme.getCsrfCookie(state);
        let formData = new FormData();
        formData.append('email', state.auth.email);
        formData.append('password', state.auth.password);
        const response = await fetch(
            `${state.source.url}/api/login`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
              },
              body: formData
            }
        );
        const loginResponse = await response.json();
        if (loginResponse.success) {
          state.theme.isLoggedIn = loginResponse.data !== false;
          if (state.theme.isLoggedIn) {
            cookies.set('token', loginResponse.data.token);
            actions.theme.redirect('/account');
          } else {
            alert("Error wrong credentials");
          }
        }
      },
      register: async ({state, actions}) => {
        await actions.theme.getCsrfCookie(state);
        let formData = new FormData();
        formData.append('name', state.auth.name);
        formData.append('email', state.auth.email);
        formData.append('password', state.auth.password);
        formData.append('confirm_password', state.auth.passwordConfirmation);
        const response = await fetch(
            `${state.source.url}/api/register`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
              },
              body: formData
            }
        );
        const registerResponse = await response.json();
        if (registerResponse.success) {
          state.theme.isLoggedIn = true;
          cookies.remove('token');
          cookies.set('token', registerResponse.data.token);
          actions.theme.redirect('/account');
        } else {
          alert("An error occurred on your registration. Please, retry later.");
        }
      },
      logout: async ({state, actions}) => {
        if (typeof state.theme.isLoggedIn !== 'undefined' && state.theme.isLoggedIn) {
          await actions.theme.getCsrfCookie(state);
          const response = await fetch(
              `${state.source.url}/api/logout`,
              {
                method: 'POST',
                headers: {
                  withCredentials: true,
                  Accept: 'application/json',
                  Authorization: `Bearer ${cookies.get('token')}`,
                }
              }
          );
          const status = await response.json();
          if (status.data.success) {
            state.theme.isLoggedIn = false;
          }
        }
        if (typeof state.theme.isLoggedIn === 'undefined' || !state.theme.isLoggedIn) {
          cookies.remove('token');
          actions.theme.redirect('/login');
        }
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
      processors: [image, iframe, links],
    },
  },
};

export default awsminF1;
