import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.frevi.app',
  appName: 'Frevi App',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;