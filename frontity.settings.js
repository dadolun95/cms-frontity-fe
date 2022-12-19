const settings = {
  "name": "awsm-project",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Davide Lunardon",
      "description": "Sono uno sviluppatore web full stack, da sempre appassionato e affascinato dal mondo dell'informatica. Costantemente alla ricerca di nuove idee e tecnologie per far evolvere il business dei miei clienti."
    }
  },
  "packages": [
    {
      "name": "@awsmin/f1",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "Chi sono",
              "/#chi-sono"
            ],
            [
              "Blog",
              "/blog"
            ],
            [
              "Lavoro",
              "/#lavoro"
            ],
            [
              "Contatti",
              "/#contatti"
            ]
          ],
          "featured": {
            "showOnList": true,
            "showOnPost": true
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "active": true,
      "state": {
        "source": {
          "url": "https://app.dadolun95.test",
          "homepage": "homepage",
          "postsPage": "blog",
          "postTypes": [
            {
              "type": "posts",
              "params": {
                "acf_format": "standard"
              }
            }
          ],
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
