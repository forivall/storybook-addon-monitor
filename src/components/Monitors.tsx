import { opacify } from "polished";
import React, { Fragment } from "react";
import { styled, withTheme, Theme } from "@storybook/theming";

import Inspector from "react-inspector";
import { ScrollArea } from "@storybook/components";

export const Action = styled.div({
  display: "flex",
  padding: 0,
  borderLeft: "5px solid transparent",
  borderBottom: "1px solid transparent",
  transition: "all 0.1s",
  alignItems: "flex-start",
  whiteSpace: "pre",
});

export const InspectorContainer = styled.div({
  flex: 1,
  padding: "0 0 0 5px",
});

export const Wrapper = styled(({ children, className }) => (
  <ScrollArea horizontal vertical className={className}>
    {children}
  </ScrollArea>
))({
  margin: 0,
  padding: "10px 5px 20px",
});

interface InspectorProps {
  theme: Theme;
  sortObjectKeys: boolean;
  showNonenumerable: boolean;
  name: any;
  data: any;
}

const ThemedInspector = withTheme(({ theme, ...props }: InspectorProps) => (
  <Inspector theme={theme.addonActionsTheme || "chromeLight"} {...props} />
));

interface ActionLoggerProps {
  items: { [name: string]: any };
}

export const Monitors = ({ items }: ActionLoggerProps) => (
  <Wrapper title="monitors">
    {Object.keys(items).map((name) => (
      <Action key={name}>
        <InspectorContainer>
          <ThemedInspector
            sortObjectKeys
            showNonenumerable={false}
            name={name}
            data={items[name].data}
          />
        </InspectorContainer>
      </Action>
    ))}
  </Wrapper>
);
