import { FC } from "react";
import { makeStyles } from "@fluentui/react-components";

const spinKeyframes = {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    animationName: spinKeyframes,
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    borderRadius: "50%",
    height: "2rem",
    width: "2rem",
    borderTop: "2px solid #111827",
    borderBottom: "2px solid #111827",
    borderLeft: "0",
    borderRight: "0",
  },
  label: {
    marginTop: "0.5rem",
  },
});

interface SpinnerProps {
  label?: string;
}

const Spinner: FC<SpinnerProps> = ({ label }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default Spinner;
