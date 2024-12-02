import React, {useEffect} from "react";
import {usePageUserStore} from "@/pages/page-user/store";
import {CellButton, Div, Spinner} from "@vkontakte/vkui";
import clsx from "clsx";

export const UserTodos = () => {
  const {user, todos, fetchTodos} = usePageUserStore(state => state);

  useEffect(() => {
    if (user && !todos) {
      fetchTodos(user.id);
    }
  }, [user, todos]);

  if (todos === null) {
    return <Div><Spinner /></Div>;
  }

  return (
    <>
      {todos?.map((todo, i) => (
        <CellButton key={todo.id}>
          <span className={clsx({"line-through opacity-40": todo.completed})}>
            {i + 1}{'. '}
            {todo.title}
          </span>
        </CellButton>
      ))}
    </>
  );
};
