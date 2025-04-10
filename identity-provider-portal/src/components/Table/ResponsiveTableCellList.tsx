import React from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { useIsTablet } from "~/hooks";
import { TableProps } from "~/components";

interface Item {
  item: React.ReactElement | string;
  index: number;
}

interface Props {
  tableData: (React.ReactElement | string)[];
  renderCellComponent(item: Item): React.ReactNode;
  headers: TableProps["tableContent"]["headers"];
  hasMoreMenu?: boolean;
}

export const ResponsiveTableCellList: React.FC<Props> = ({
  tableData,
  renderCellComponent,
  headers,
  hasMoreMenu = false,
}) => {
  const isTablet = useIsTablet();

  let widthPercent = "90%";

  const ResponsiveElement: React.FC<GridProps> = ({ children, ...props }) => {
    if (isTablet) return <Grid {...props}>{children}</Grid>;

    return <>{children}</>;
  };

  const data: Props["tableData"] = tableData.map((item) => item);
  console.log(tableData);

  return (
    <ResponsiveElement
      style={{
        paddingTop: "10px",
        paddingBottom: "10px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
      container
    >
      <ResponsiveElement
        style={{ alignSelf: "flex-start", width: widthPercent }}
        item
        sm={8}
      >
        {data.map((item, index) => renderCellComponent({ item, index }))}
      </ResponsiveElement>
    </ResponsiveElement>
  );
};
