import React, {useEffect} from "react";
import {Button, Div, Spinner} from "@vkontakte/vkui";
import {UserCard} from "@/entities/user";
import {ExternalLink} from "lucide-react";
import {ToUserLink} from "@/features/user";
import {usePageMainStore} from "@/pages/page-main/store";

export function PageMain() {
  const {users, status, fetchUsers} = usePageMainStore((state) => state);

  useEffect(() => {
    if (status === "idle") {
      fetchUsers();
    }
  }, [status]);

  if (status === "idle" || status === "pending") {
    return <Div><Spinner /></Div>;
  }

  return (
    <Div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          after={
            <ToUserLink userId={user.id}>
              <Button appearance="neutral" after={<ExternalLink size={18} />} />
            </ToUserLink>
          }
        />
      ))}
    </Div>
  );
}
