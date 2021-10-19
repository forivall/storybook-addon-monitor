export interface MonitorOptions {
  depth?: number;
  clearOnStoryChange?: boolean;
  limit?: number;
  allowFunction?: boolean;
}

export const config: MonitorOptions = {
  depth: 10,
  clearOnStoryChange: true,
  limit: 50,
};

export const configureMonttor = (options: MonitorOptions = {}): void => {
  Object.assign(config, options);
};
