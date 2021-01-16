import React from 'react';
import { Settings, SettingsData } from './types';
import { VARS } from './constants';

const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }: { children?: any }) => {
  const [currentSettings, setCurrentSettings] = React.useState<Settings>({
    error: '',
    loading: false,
    data: VARS.settings,
  });

  const setSettings = (partialSettings: Partial<Settings>) =>
    setCurrentSettings({
      ...currentSettings,
      ...partialSettings,
    });

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: (newSettings) => {
          setSettings({ loading: true, error: '' });
          fetch(`${VARS.restPluginBase}settings`, {
            method: 'POST',
            body: JSON.stringify(newSettings),
            headers: { 'Content-Type': 'application/json' },
          }).then((resp) => {
            if (resp.status >= 300) {
              resp.json().then((response) => {
                setSettings({
                  loading: false,
                  error: response.message,
                });
              });
            } else {
              resp.json().then((data) => {
                setSettings({
                  loading: false,
                  error: '',
                  data,
                });
              });
            }
          });
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): [Settings, (settings: SettingsData) => void] => {
  const { settings = {}, saveSettings = () => {} } = React.useContext(
    SettingsContext
  );
  return [settings, saveSettings];
};
