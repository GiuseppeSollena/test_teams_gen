import { FC, ReactNode } from "react";
import { makeStyles } from '@fluentui/react-components';
import Spinner from "shared/components/Spinner";

interface GenericLayoutProps {
  body: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    margin: "0 0.25rem", 
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem", 
  },
});

const GenericLayout: FC<GenericLayoutProps> = ({
  header,
  body,
  footer,
  isLoading = false,
}) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      {/* Header */}
      {!isLoading && header}

      {/* Body */}
      <div className={styles.body}>
        {isLoading ? <Spinner label="Loading content..." /> : body}
      </div>

      {/* Footer */}
      {!isLoading && footer}
    </div>
  );
};

export default GenericLayout;
