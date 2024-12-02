import {Cell} from "@vkontakte/vkui";
import {House, LucideMail, PhoneCall} from "lucide-react";
import React from "react";
import {usePageUserStore} from "@/pages/page-user/store";

export const UserProfile = () => {
  const user = usePageUserStore(state => state.user);

  if (user) {
    return (
      <div>
        <Cell before={<LucideMail />}>{user.email}</Cell>
        <Cell before={<PhoneCall />}>{user.phone}</Cell>
        <Cell before={<House />}>{user.address.city}</Cell>
      </div>
    );
  }
  return null;
};
