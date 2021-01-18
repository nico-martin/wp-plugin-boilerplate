import React from 'react';
import { Settings } from './types';
import { VARS } from './constants';

const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }: { children?: any }) => {
  const [currentSettings, setCurrentSettings] = React.useState<Settings>(
    VARS.settings
  );

  const setSettings = (partialSettings: Partial<Settings>) =>
    setCurrentSettings({
      ...currentSettings,
      ...partialSettings,
    });

  const postSettings = (data) =>
    new Promise((resolve, reject) => {
      fetch(`${VARS.restPluginBase}settings`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.data.status < 300) {
            resolve(resp);
          } else {
            reject(new Error(resp.message));
          }
        })
        .catch(() => {
          reject(new Error(VARS.generalError));
        });
    });

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: (newSettings) =>
          new Promise((resolve, reject) =>
            postSettings(newSettings)
              .then((response) => {
                resolve(response);
                setSettings(response);
              })
              .catch((response) => {
                reject(response);
              })
          ),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): [
  Settings,
  (settings: Settings) => Promise<Settings>
] => {
  const {
    settings = {},
    saveSettings = new Promise((resolve) => {
      resolve('');
    }),
  } = React.useContext(SettingsContext);
  return [settings, saveSettings];
};
