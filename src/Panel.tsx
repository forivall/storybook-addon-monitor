import React from "react";
import { useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";

import { Monitors } from "./components/Monitors";
import { EVENTS } from "./constants";

interface PanelProps {
  active: boolean;
}

const MonitorsPanel: React.FC<PanelProps> = (props) => {
  const [items, setState] = React.useState({});
  const setMonitor = React.useCallback(
    (key: string, value: any) =>
      setState((prev) => ({ ...prev, [key]: value })),
    []
  );
  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  useChannel({
    [EVENTS.RESULT]: (newResults) => setMonitor(newResults.name, newResults),
  });

  return (
    <AddonPanel {...props}>
      <Monitors items={items} />
    </AddonPanel>
  );
};

export { MonitorsPanel as Panel };
