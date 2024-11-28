import React, { FC, useEffect, useState } from "react";
import { Button, Card, Div, Headline, Spinner, Text } from "@vkontakte/vkui";
import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Router } from "@angular/router";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface PageVkuiProps {
  injector: Injector;
  id: number | string;
}

export const PageVkui: FC<PageVkuiProps> = ({ injector, id }) => {
  const http = injector.get(HttpClient);
  const router = injector.get(Router);

  const [todo, setTodo] = useState<Todo | null>();

  useEffect(() => {
    setTodo(null);
    getTodos(id).then(setTodo);
  }, [id]);

  function goNext() {
    return router.navigate(["vkui-page", Number(id) + 1]);
  }

  function goPrev() {
    return router.navigate(["vkui-page", Number(id) - 1]);
  }

  /**
   * Запрос на получение Todos из http клиента Angular
   */
  function getTodos(id: string | number) {
    return firstValueFrom(
      http.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
    );
  }

  return (
    <Div>
      <div style={{ display: "flex", gap: "4px" }}>
        <Button onClick={goPrev}>Prev</Button>
        <Button onClick={goNext}>Next</Button>
      </div>

      <div>
        {todo ? (
          <Card mode="outline">
            <Headline>{todo.title}</Headline>
            <Text>ID: {todo.id}</Text>
          </Card>
        ) : (
          <Spinner />
        )}
      </div>
    </Div>
  );
};
