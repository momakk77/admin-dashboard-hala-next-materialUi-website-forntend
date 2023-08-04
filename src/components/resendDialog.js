import TextField from "@mui/material/TextField";
import { Box, SvgIcon, Grid, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import axios from 'axios';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));


function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <Button
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <SvgIcon>
                        <XMarkIcon />
                    </SvgIcon>
                </Button>
            ) : null}

        </DialogTitle>
    );
}
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const ResendMessageDialog = ({ open, setOpen, enquireId, onSuccess }) => {



    const [formValues, setFormValues] = useState({});

    const checkFormValues = useMemo(() => {
        return formValues.message
    }, [formValues]);


    const onFormSubmit = (e) => {
        e.preventDefault();


        let reSend = {
            message: formValues.message,
        }
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // }
        axios.post(`/api/request/${enquireId}/resend`, reSend).then((response) => {
            console.log("ssss")
            onSuccess && onSuccess()
            setOpen(false)
            setFormValues({
                message: ""
            });
        }).catch((err) => {
            console.log(err);
            console.log("error uploading");
        });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <BootstrapDialog
                fullWidth
                sx={{
                    width: "100%",
                    height: "100%",
                }}
                onClose={handleClose}
                open={open}
            >
                <BootstrapDialogTitle
                    sx={{
                        font: "normal normal normal 1.5rem Red Hat Text",
                        color: "var(--unnamed-color-2c2a26)",
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                        opacity: 1,
                    }}
                    onClose={handleClose}
                >
                    Resent Message
                </BootstrapDialogTitle>

                <Box
                    sx={{
                        p: 4,
                    }}
                >
                    <Grid container >
                    </Grid>
                    {/* massage grid */}
                    <Grid item sm={4} xs={12} marginBottom={3}>
                        <Typography>
                            Message:
                        </Typography>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            maxRows={5}
                            rows={5}
                            value={formValues.message}
                            onChange={(e) => {
                                setFormValues((v) => {
                                    return {
                                        ...v,
                                        message: e.target.value
                                    }
                                })
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--unnamed-color-afaba1)",
                                    border: "0.5px solid var(--unnamed-color-e2e1df)",
                                    background:
                                        "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
                                    borderRadius: 2,
                                },
                            }}
                        />
                    </Grid>

                    <Grid item sm={8} xs={12} marginTop={5}>
                        <Button
                            disabled={!checkFormValues}
                            onClick={onFormSubmit}
                            variant="contained"
                            disableElevation
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#312E81",
                                    opacity: 0.7,
                                },
                                background: "#312E81",
                                width: "100%",
                            }}
                        >
                            <Typography
                                color="white"
                                display="inline"
                                variant="body2"
                            >
                                SEND
                            </Typography>
                        </Button>
                    </Grid>

                </Box>
            </BootstrapDialog>
        </>
    );
};

export default ResendMessageDialog;