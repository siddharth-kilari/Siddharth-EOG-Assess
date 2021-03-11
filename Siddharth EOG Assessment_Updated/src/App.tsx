import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { Provider as UrqlProvider } from 'urql';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import GraphData from './components/GraphData';
import { client, subscriptionClient } from './clients';

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  } as any,
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    } as any
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <UrqlProvider value={client}>
          <Header />
          <GraphData />
        </UrqlProvider>
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
