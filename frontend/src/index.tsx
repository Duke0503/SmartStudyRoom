import 'react-native-gesture-handler';
import React from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationNavigator } from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "@gluestack-ui/themed-native-base";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as mapping } from '../mapping.json';
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

export default function App() {
  return (
    <ApplicationProvider  {...eva} theme={eva.light} customMapping={mapping}>
      <NativeBaseProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ApplicationNavigator />
          </PersistGate>
        </Provider>
      </NativeBaseProvider>
    </ApplicationProvider>
  );
}