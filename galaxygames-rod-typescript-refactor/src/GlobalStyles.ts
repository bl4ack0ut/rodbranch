import { createGlobalStyle } from "styled-components";
import DigitalixR from "./assets/fonts/digitalix_regular-webfont.woff";
import DigitalixR_2 from "./assets/fonts/digitalix_regular-webfont.woff2";
import Digitalix2 from "./assets/fonts/digitalix2-webfont.woff";
import Digitalix2_2 from "./assets/fonts/digitalix2-webfont.woff2";

export const GlobalStyles = createGlobalStyle`
* { box-sizing:border-box; }
html {
  background-color: #413443;
}
html, body {
    min-width: 100vw;
}
body {
    box-sizing: border-box;
    /* background: url(/assets/bg.png) no-repeat top left; */
    background-size: contain;
    background-attachment: fixed;
    background-position-x: -140px;
    background-position-y: -40px;
    z-index: -2;
    background-color: transparent;
    font-family: 'Digitalix', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @font-face {
        font-family: 'Digitalix';
        src: local('Digitalix'), local('Digitalix'),
        url(${DigitalixR}) format('woff2'),
        url(${DigitalixR_2}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Digitalix2';
        src: local('Digitalix2'), local('Digitalix2'),
        url(${Digitalix2_2}) format('woff2'),
        url(${Digitalix2}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
}
html, body, #root {
    font-family: 'Digitalix', sans-serif;
    font-size: 10px;
    font-weight: 300;
    line-height: 14px;
    padding: 0;
    margin: 0;
    color: white;
    min-height: 100%;
}
#root {
    display: flex;
    flex-direction: column;
}
#root > [data-reactroot] {
    height: inherit;
}
a { text-decoration: none; }
code {
  font-family: Digitalix, monospace;
}
img {
  max-width: 600px;
  max-height: 600px;
}
.text__shadow { text-shadow: 1px 1px 2px black; }
.value__white { color: white;}
.value__green { color: #7cab58; }
.value__red { color: #8c304b; }
.value__yellow { color: #e3a74e; }
.value__orange { color: #fb6b1d; }
.value__dark { color: #444; }
.takespace { display: flex; flex: 1; }
.hidemobile {
  @media only screen and (max-width: 1024px) {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
}


/* ============================ GLOBAL CLASSES ============================*/
#bgLoop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: -1;
}
.mainlogo {
  width: 600px;
  height: 235px;
  user-select: none;

  @media only screen and (max-width: 768px) {
    width: 450px;
    height: 176px;
  }
}
.mainlogo__small {
  width: 390px;
  height: 153px;
  user-select: none;

  @media only screen and (max-width: 768px) {
    width: 450px;
    height: 176px;
  }
}
.text-center { text-align: center; }
.hidden { visibility: hidden; display: none; }

.btn {
  padding: .1rem .8rem;
  border-radius: 0;
  min-width: 8em;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Digitalix', sans-serif;
  text-shadow: none;
}

.btn-primary {
  text-align: center;
  padding: .4rem .8rem;
  cursor: pointer;
  background: #91db69;
  color: #3e3546;
  border: #3e3546 3px solid;
  outline: 3px solid #91db69;
  text-transform: uppercase;
  font-family: 'Digitalix', sans-serif;
  text-shadow: none;
  &:hover {
    background: #fb6b1d;
    color: #fff;
    border: 3px solid #fff;
    outline: 3px solid #fb6b1d;
  }
  &:disabled {
    background: #d4d4d4;
    outline: 3px solid #d4d4d4;
    cursor: not-allowed;
  }
}

.btn-secondary {
  text-align: center;
  padding: .4rem .8rem;
  cursor: pointer;
  background: #fb6b1d;
  color: #3e3546;
  border: #3e3546 3px solid;
  outline: 3px solid #fb6b1d;
  text-transform: uppercase;
  font-family: 'Digitalix', sans-serif;
  text-shadow: none;
  &:hover {
    background: #91db69;
    color: #fff;
    border: #fff 3px solid;
    outline: 3px solid #91db69;
  }
  &:disabled {
    background: #b4b4b4;
    outline: 3px solid #b4b4b4;
    cursor: not-allowed;
  }
}
.btn-no {
  background: #c32454;
  color: #ffffff;
  outline: 3px solid #c32454;
}

@media only screen and (max-width: 768px) {
  .btn {
    min-width: 6em;
    font-size: 0.8rem;
  }
}
`;
