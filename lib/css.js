module.exports = ({bg, color, dark, title, width}) => `
  body {
    background: ${bg};
    color: ${color};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin: 0 auto;
    max-width: ${width}px;
    padding: 0 .5em 1em .5em;
  }
  body > img {
    border-bottom: 3px solid ${dark};
    border-top: 3px solid ${dark};
    width: 100%;
  }
  body > p:first-of-type::before {
    content: '${title} · ';
    color: ${dark};
    font-weight: bold;
  }
  body > p:first-of-type::before,
  aside {
    font-variant: small-caps;
    font-family: Georgia, serif;
  }
  aside {
    font-size: 62%;
    margin-bottom: 1em;
    margin-left: 38%;
    text-align: right;
  }
  aside * {
    margin: 0;
  }
  a {
    color: ${dark};
    text-decoration: none;
  }
  a:hover,
  a:visited:hover {
    color: #6c71c4;
  }
  a:visited {
    color: ${color};
  }
  a::after {
    content: '⭟';
    font-size: 62%;
    margin-left: 1px;
    vertical-align: super;
  }
  img {
    border: 1px solid ${color};
  }
`
