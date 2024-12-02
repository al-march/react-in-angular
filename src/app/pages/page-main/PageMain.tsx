import React, {useEffect} from "react";
import {Button, Div, Spinner} from "@vkontakte/vkui";
import {useSelector} from "react-redux";
import {fetchUsersThunk, selectStatus, selectUsers} from "@/core/state/user.state";
import {UserCard} from "@/entities/user";
import {ExternalLink} from "lucide-react";
import {ToUserLink} from "@/features/user";
import {useAppDispatch} from "@/core/state";

export function PageMain() {
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsersThunk());
    }
  }, [status, dispatch]);

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
