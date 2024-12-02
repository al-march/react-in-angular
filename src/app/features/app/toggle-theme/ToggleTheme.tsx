import React from "react";
import {ThemeMode, useThemeStore} from "@/core/state/theme.state";
import {Button} from "@vkontakte/vkui";
import {Moon, Sun} from "lucide-react";

const ThemeIcon = ({mode}: { mode: ThemeMode }) => mode === "light"
  ? <Sun size="16" />
  : <Moon size="16" />;

export const ToggleTheme = () => {
  const {mode, toggle} = useThemeStore((state => state));

  return (
    <Button
      after={<ThemeIcon mode={mode} />}
      rounded
      mode="tertiary"
      onClick={toggle}
    />
  );
};
