import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
    DialogActions,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import axios from "axios";
import CrossStyledIcon from "../icons/cross";
import { ArrowBackIosNewSharp } from "@mui/icons-material";
import StyledButton from "../button";

interface ReportDialogProps {
    open: boolean;
    advertId: string;
    userId: string;
    handleClose: () => void;
}

const ReportDialog: React.FC<ReportDialogProps> = ({
    open,
    advertId,
    userId,
    handleClose,
}) => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [reportDescription, setReportDescription] = useState("");

    const host = import.meta.env.VITE_HOST;

    const handleReportSelect = (report: string) => {
        setSelectedReport(report);
    };

    const handleSubmitDialog = () => {
        sendData();
        setSelectedReport(null);
        setReportDescription("");
        handleClose();
    };

    const handleCloseDialog = () => {
        setSelectedReport(null);
        setReportDescription("");
        handleClose();
    };

    const sendData = async () => {
        try {
            const res = await axios.post(
                `${host}/advertReports/`,
                {
                    advertId: advertId,
                    userId: userId,
                    reason: selectedReport,
                    text: reportDescription,
                }
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const reportReasons = [
        "Неправильні відомості про продавця",
        "Проблема з товаром/послугою",
        "Неправильна чи суперечлива інформація",
        "Шахрайство",
        "Небезпечний або неприйнятний вміст",
    ];

    return (
        <Dialog transitionDuration={0.1} open={open} onClose={handleClose}>
            <DialogTitle
                sx={{
                    backgroundColor: "#254ACE",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "30px",
                    padding: "16px 12px",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Nunito",
                        fontSize: "24px",
                        fontWeight: "700",
                    }}
                >
                    {selectedReport ? selectedReport : "Оберіть причину скарги"}
                </Typography>
                <IconButton onClick={handleCloseDialog}>
                    <CrossStyledIcon />
                </IconButton>
            </DialogTitle>
            {selectedReport === null ? (
                <List
                    sx={{
                        padding: "0",
                    }}
                >
                    {reportReasons.map((item) => (
                        <ListItem
                            button
                            divider
                            onClick={() => {
                                handleReportSelect(item);
                            }}
                            sx={{
                                width: "470px",
                            }}
                        >
                            <ListItemText
                                disableTypography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                }}
                                primary={item}
                            />
                            <ArrowBackIosNewSharp
                                sx={{
                                    rotate: "180deg",
                                    width: "20px",
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Box
                    sx={{
                        padding: "16px",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Nunito",
                        }}
                    >
                        Додайте опис скарги
                    </Typography>
                    <TextField
                        multiline
                        fullWidth
                        rows={4}
                        value={reportDescription}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                fontFamily: "Nunito",
                            },
                        }}
                        onChange={(e) => setReportDescription(e.target.value)}
                    />
                    <DialogActions>
                        <StyledButton
                            onClick={handleSubmitDialog}
                            type={"outlined"}
                            secondaryColor="#000"
                            text="Скасувати"
                        />
                        <StyledButton
                            onClick={handleSubmitDialog}
                            type="contained"
                            primaryColor="#254ACE"
                            hoverBackColor=""
                            text="Відправити"
                        />
                    </DialogActions>
                </Box>
            )}
        </Dialog>
    );
};

export { ReportDialog };
