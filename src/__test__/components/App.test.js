import ReactDOM from 'react-dom'
const { default: App } = require("../../components/App");

describe('app.js', () => {

  test('render without crashing', () => {
    const router = document.createElement('Router');
    ReactDOM.render(<App />, router)
  })
})