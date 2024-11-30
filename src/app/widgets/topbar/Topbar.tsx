import React, { FC } from "react";
import { Avatar, Panel, PanelHeader } from "@vkontakte/vkui";

export const Topbar: FC = () => {
  return (
    <Panel id="panel1">
      <PanelHeader after={<Avatar size={36} />}>
        NgReact
      </PanelHeader>
    </Panel>
  );
};
