import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { darkBlue } from "~/styles";

export interface PaginationProps {
    onChangePage: (e: any, page: any) => void,
    page: number,
    count: number,
    rowsPerPage: number,
    localization?: {
        firstTooltip: string,
        previousTooltip: string,
        nextTooltip: string,
        lastTooltip: string,
        labelDisplayedRows: string,
        labelRowsPerPage: string,
    },
    showFirstLastPageButtons?: boolean,
}

export const Pagination: React.FC<PaginationProps> = (props) => {
    const {
        count = 1,
        page = 1,
        rowsPerPage = 1,
        showFirstLastPageButtons = true,
        localization = {
            firstTooltip: "First Page",
            previousTooltip: "Previous Page",
            nextTooltip: "Next Page",
            lastTooltip: "Last Page",
            labelDisplayedRows: "{from}-{to} of {count}",
            labelRowsPerPage: "Rows per page:",
        }
    } = props;
    console.log("props", props)
    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        props.onChangePage(event, 1);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        props.onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        props.onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        props.onChangePage(
            event,
            (count / rowsPerPage) + 1)
    };


    return (
        <div style={{
            flexShrink: 0,
            color: 'white',
            background: darkBlue,
            display: "flex",
            justifyContent: "center"
        }} >
            {showFirstLastPageButtons && (
                <Tooltip title={localization.firstTooltip}>
                    <span>
                        <IconButton
                            style={{ color: "inherit" }}
                            onClick={handleFirstPageButtonClick}
                            disabled={page === 1}
                        >

                            <FirstPage />

                        </IconButton>
                    </span>
                </Tooltip>
            )}
            <Tooltip title={localization.previousTooltip}>
                <span>
                    <IconButton
                        style={{ color: "inherit" }}
                        onClick={handleBackButtonClick}
                        disabled={page === 1}
                    >
                        <ChevronLeft />
                    </IconButton>
                </span>
            </Tooltip>
            <Typography
                variant="caption"
                style={{
                    textAlign: "center",
                    alignSelf: "center",
                    flexBasis: "inherit",
                }}
            >
                {localization.labelDisplayedRows
                    .replace(
                        "{from}",
                        `${count === 0
                            ? 0
                            :
                            (page - 1) * rowsPerPage + 1 >= count ? count
                                : (page - 1) * rowsPerPage + 1
                        }`
                    )
                    .replace(
                        "{to}",
                        `${Math.min(
                            (page) * rowsPerPage,
                            count
                        )}`
                    )
                    .replace("{count}", `${count}`)}
            </Typography>
            <Tooltip title={localization.nextTooltip}>
                <span>
                    <IconButton
                        style={{ color: "inherit" }}
                        onClick={handleNextButtonClick}
                        disabled={page >= Math.ceil(count / rowsPerPage)}
                    >
                        <ChevronRight />
                    </IconButton>
                </span>
            </Tooltip>
            {
                showFirstLastPageButtons && (
                    <Tooltip title={localization.lastTooltip}>
                        <span>
                            <IconButton
                                style={{ color: "inherit" }}
                                onClick={handleLastPageButtonClick}
                                disabled={page >= Math.ceil(count / rowsPerPage)}
                            >
                                <LastPage />
                            </IconButton>
                        </span>
                    </Tooltip>
                )
            }
        </div >
    );
}

