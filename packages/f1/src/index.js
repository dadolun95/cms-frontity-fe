import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import links from "./processor/links";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enTranslations from "./components/i18n/en_US.json";
import itTranslations from "./components/i18n/it_IT.json";

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
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
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
