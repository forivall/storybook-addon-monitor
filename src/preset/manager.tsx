import React from "react";
import { addons, types } from "@storybook/addons";

import { ADDON_ID, PANEL_ID, PARAM_KEY } from "../constants";
import { Panel } from "../Panel";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Monitor",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active, key }) => <Panel key={key} active={active} />,
    paramKey: PARAM_KEY,
  });
});
