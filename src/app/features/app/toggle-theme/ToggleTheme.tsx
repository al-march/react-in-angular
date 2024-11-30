import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme, setTheme, ThemeMode} from "@/core/state/theme.state";
import {Button} from "@vkontakte/vkui";
import {Moon, Sun} from "lucide-react";

const ThemeIcon = ({mode}: { mode: ThemeMode }) => mode === "light"
  ? <Sun size="16" />
  : <Moon size="16" />;

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  function toggle() {
    if (theme === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  }

  return (
    <Button
      after={<ThemeIcon mode={theme} />}
      rounded
      mode="tertiary"
      onClick={toggle}
    />
  );
};
