import { FC } from "react";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import useSampleContext from "../hooks/UseSampleContext";
import { SampleTable } from "../models/SampleModels";
import useModalContext from "core/hooks/useModalContext";
import SampleModal from "./SampleModal";

const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
  scrollContainer: {
    overflowX: "auto",
  },
  table: {
    minWidth: "100%",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },
  tableHeaderRow: {
    backgroundColor: "#e5e7eb",
  },
  tableHeaderCell: {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#f3f4f6",
    },
  },
  tableCell: {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
  },
  textCenter: {
    textAlign: "center",
  },
  noDataCell: {
    textAlign: "center",
    padding: "1rem 0",
  },
});

const SampleBody: FC = () => {
  const styles = useStyles();
  const { data } = useSampleContext();
  const { openModal } = useModalContext();

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeaderRow}>
              <th className={styles.tableHeaderCell}>ID</th>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Description</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item: SampleTable) => (
                <tr key={item.id} className={styles.tableRow} onClick={()=> {
                  openModal(<SampleModal description={item.description} name={item.name} />)
                }}>
                  <td
                    className={mergeClasses(
                      styles.tableCell,
                      styles.textCenter
                    )}
                  >
                    {item.id}
                  </td>
                  <td className={styles.tableCell}>{item.name}</td>
                  <td className={styles.tableCell}>{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className={styles.noDataCell}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SampleBody;
