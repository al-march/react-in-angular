import React, {FC, useEffect, useState} from "react";
import {Div, Group, Tabs, TabsItem, Text} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {selectUserById} from "@/core/state/user.state";
import {UserCard} from "@/entities/user";
import {Case, Match} from "@/shared/render-tools";
import {UserProfile, UserTodos} from "./components";
import {RootState} from "@/core/state";
import {addUser} from "@/pages/page-user/store";

export type PageUserProps = {
  userId: string;
}

enum UserTabs {
  PROFILE,
  TODOS
}

export const PageUser: FC<PageUserProps> = ({userId}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUserById(state, userId));
  const [selectedTab, setSelectedTab] = useState<UserTabs>(UserTabs.PROFILE);

  useEffect(() => {
    if (user) {
      dispatch(addUser(user));
    }
  }, [user]);

  if (!user) {
    return <Text>Пользователь не найден =(</Text>;
  }

  function isSelected(tab: UserTabs) {
    return selectedTab === tab;
  }

  function selectTab(tab: UserTabs) {
    setSelectedTab(tab);
  }

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
};
