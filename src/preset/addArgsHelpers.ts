import { addons, Args, StoryContext } from "@storybook/addons";
import uuidv4 from "uuid-browser/v4";
import { config, MonitorOptions } from "../configureMonitor";
import { ARGTYPES_KEY, EVENTS, PARAM_KEY } from "../constants";

export interface MonitorDisplay {
  name: string;
  data: any;
  count: number;
  options: MonitorOptions;
}

export type HandlerFunction = (...args: any[]) => void;
function defineMonitor(
  name: string,
  options: MonitorOptions = {}
): HandlerFunction {
  const actionOptions = {
    ...config,
    ...options,
  };

  const handler = function actionHandler(...args: any[]) {
    const channel = addons.getChannel();
    const minDepth = 5; // anything less is really just storybook internals

    const actionDisplayToEmit: MonitorDisplay = {
      count: 0,
      name,
      data: args.length > 1 ? args : args[0],
      options: {
        ...actionOptions,
        depth: minDepth + (actionOptions.depth || 3),
        allowFunction: actionOptions.allowFunction || false,
      },
    };
    channel.emit(EVENTS.RESULT, actionDisplayToEmit);
  };

  return handler;
}

/** Add action args for list of strings. */
export const addMonitorFromArgTypes = (context: StoryContext) => {
  const { initialArgs = {}, argTypes, parameters } = context;
  const monitors = parameters[PARAM_KEY];
  if (monitors?.disable || !argTypes) {
    return {};
  }

  const argTypesWithMonitor = Object.entries(argTypes).filter(
    ([name, argType]) => !!argType[ARGTYPES_KEY]
  );

  return argTypesWithMonitor.reduce((acc, [name, argType]) => {
    if (typeof initialArgs[name] === "undefined") {
      acc[name] = defineMonitor(
        typeof argType[ARGTYPES_KEY] === "string" ? argType[ARGTYPES_KEY] : name
      );
    }
    return acc;
  }, {} as Args);
};
