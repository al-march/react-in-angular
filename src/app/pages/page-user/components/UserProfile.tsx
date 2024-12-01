import {Cell} from "@vkontakte/vkui";
import {House, LucideMail, PhoneCall} from "lucide-react";
import React from "react";
import {useSelector} from "react-redux";
import {selectUser} from "@/pages/page-user/store";

export const UserProfile = () => {
  const user = useSelector(selectUser);

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
