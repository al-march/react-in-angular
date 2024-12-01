import React, {useEffect} from "react";
import {httpClient} from "@/core/http";
import {useDispatch, useSelector} from "react-redux";
import {addTodos, selectTodos, selectUser} from "@/pages/page-user/store";
import {Todo} from "@/shared/models";
import {CellButton, Div, Group, Spinner} from "@vkontakte/vkui";
import clsx from "clsx";

export const UserTodos = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const todos = useSelector(selectTodos);

  useEffect(() => {
    if (user && !todos) {
      getTodos(user.id).then(res => {
        dispatch(addTodos(res.data));
      });
    }
  }, [user, todos]);

  function getTodos(userId: string | number) {
    return httpClient.get<Todo[]>(`/todos?userId=${userId}`);
  }

  if (todos === null) {
    return <Div><Spinner /></Div>;
  }

  return (
    <Group>
      {todos?.map((todo, i) => (
        <CellButton key={todo.id}>
          {i + 1}. <span className={clsx({"line-through opacity-40": todo.completed})}>{todo.title}</span>
        </CellButton>
      ))}
    </Group>
  );
};
