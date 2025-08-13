import { makeStyles, tokens } from "@fluentui/react-components";
import { FC } from "react";

const useStyles = makeStyles({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalXL}`,
    background: tokens.colorBrandBackground,
  },
  leftLogo: {
    height: "40px",
  },
});

const AppNavbar: FC = () => {
  const styles = useStyles();
  return (
    <nav className={styles.navbar} />
  );
};

export default AppNavbar;
