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
        .then((resp) => Promise.all([resp, resp.json()]))
        .then(([resp, data]) => {
          if (resp.status < 300) {
            resolve(data);
          } else {
            reject(new Error(data.message));
          }
        })
        .catch(() => {
          reject(new Error('<p>' + VARS.generalError + '</p>'));
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

const filterObject = (object: Object, keys: string[] = []) => {
  if (keys.length === 0) {
    return object;
  }

  const values = {};
  keys.map((key) => {
    if (key in object) {
      values[key] = object[key];
    }
  });
  return values;
};

export const useSettings = (
  keys: string[] = []
): [Settings, (settings: Settings) => Promise<Settings>] => {
  const {
    settings = {},
    saveSettings = new Promise((resolve) => {
      resolve('');
    }),
  } = React.useContext(SettingsContext);
  return [filterObject(settings, keys), saveSettings];
};
