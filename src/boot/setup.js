import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";

import configureStore from "./configureStore";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/platform";

import ContextProvider from './LanguageContext';
import LanguageProvider from '../utils/LanguageProvider';
import {translationMessages} from '../i18n';

export interface Props {}
export interface State {
  store: Object;
  isLoading: boolean;
}
export default class Setup extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <ContextProvider>
        <LanguageProvider messages={translationMessages}>
          <StyleProvider style={getTheme(variables)}>
            <Provider store={this.state.store}>
              <App />
            </Provider>
          </StyleProvider>
          </LanguageProvider>
      </ContextProvider>
    );
  }
}
