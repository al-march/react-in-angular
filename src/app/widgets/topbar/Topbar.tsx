import React, {FC} from "react";
import {Avatar, Flex, Panel, PanelHeader} from "@vkontakte/vkui";
import {ToggleTheme} from "@/features/app/toggle-theme";

export const Topbar: FC = () => {
  return (
    <Panel id="panel1">
      <PanelHeader after={
        <Flex align="center" className="gap-2">
          <ToggleTheme />
          <Avatar size={36} />
        </Flex>
      }>
        NgReact
      </PanelHeader>
    </Panel>
  );
};
