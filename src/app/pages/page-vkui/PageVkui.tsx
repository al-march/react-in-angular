import React from "react";
import { Banner, Button, Div, Image } from "@vkontakte/vkui";

export const PageVkui = () => {
  return (
    <Div>
      <p>Компонент страницы с баннером</p>
      <Banner
        before={
          <Image
            size={96}
            src="https://sun9-63.userapi.com/yOEQYPHrNHjZEoanbqPb65HPl5iojmiLgLzfGA/W3geVMMt8TI.jpg"
          />
        }
        header="Баста в Ледовом"
        subheader="Большой концерт"
        asideMode="dismiss"
        actions={<Button>Подробнее</Button>}
      />
    </Div>
  );
};
