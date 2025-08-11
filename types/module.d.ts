declare global {
  interface Window {
    bandOfBladesSheets: {
      api: ModuleAPI;
    };
  }
}

export interface ModuleAPI {
  // Define your module's API here
}

export {};