import React, { useEffect, useState } from "react";
import { Div, Text } from "@vkontakte/vkui";
import { httpClient } from "@/core/http";
import { User } from "@/shared/models";
import { UserCard } from "@/entities/user";

export function PageMain() {
  const http = httpClient;

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    http.get<User[]>("users")
      .then(({ data }) => setUsers(data));
  }, []);

  return (
    <Div>
      <Text>Hello world!</Text>

      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Div>
  );
}
