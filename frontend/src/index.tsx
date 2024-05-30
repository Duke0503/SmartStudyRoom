import 'react-native-gesture-handler';
import React from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BottomNavigator } from "./Navigation";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as mapping } from '../mapping.json';
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

export default function App() {
  return (
    <ApplicationProvider  {...eva} theme={eva.light} customMapping={mapping}>
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BottomNavigator />
          </PersistGate>
        </Provider>
      </GluestackUIProvider>
    </ApplicationProvider>
  );
}