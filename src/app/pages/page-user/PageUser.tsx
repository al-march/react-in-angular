import React, {FC, useEffect, useState} from "react";
import {Div, Group, Spinner, Tabs, TabsItem, Text} from "@vkontakte/vkui";
import {UserCard} from "@/entities/user";
import {Case, Match} from "@/shared/render-tools";
import {UserProfile, UserTodos} from "./components";
import {usePageUserStore} from "@/pages/page-user/store";

export type PageUserProps = {
  userId: string;
}

enum UserTabs {
  PROFILE,
  TODOS
}

export const PageUser: FC<PageUserProps> = ({userId}) => {
  const {user, status, fetchUser} = usePageUserStore((state) => state);
  const [selectedTab, setSelectedTab] = useState<UserTabs>(UserTabs.PROFILE);

  useEffect(() => {
    fetchUser(Number(userId));
  }, [userId]);

  function isSelected(tab: UserTabs) {
    return selectedTab === tab;
  }

  function selectTab(tab: UserTabs) {
    setSelectedTab(tab);
  }

  if (user) {
    return (
      <Div>
        <UserCard user={user} />

        <Group>
          <Tabs mode="secondary">
            <TabsItem
              selected={isSelected(UserTabs.PROFILE)}
              onClick={() => selectTab(UserTabs.PROFILE)}
            >
              Профиль
            </TabsItem>
            <TabsItem
              selected={isSelected(UserTabs.TODOS)}
              onClick={() => selectTab(UserTabs.TODOS)}
            >
              Задачи
            </TabsItem>
          </Tabs>
        </Group>

        <Div>
          <Match expression={selectedTab}>
            <Case value={UserTabs.PROFILE}>
              <UserProfile />
            </Case>
            <Case value={UserTabs.TODOS}>
              <UserTodos />
            </Case>
          </Match>
        </Div>
      </Div>
    );
  }

  switch (status) {
    case "idle":
    case "pending":
      return <Div><Spinner /></Div>;
    default:
      return <Text>Пользователь не найден (</Text>;
  }
};
