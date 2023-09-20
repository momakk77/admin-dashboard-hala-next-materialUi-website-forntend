import { Box, Stack, Grid, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import TextField from "@mui/material/TextField";
import { SvgIcon } from '@mui/material';
import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';



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



const UpdateCategory = ({ open, setOpen, categoryId, onSuccess }) => {



    const [loading, setLoading] = useState(false);
    const [getAllCategories, setGetAllCategories] = useState([]);
    const [formValues, setFormValues] = useState({});

    const checkFormValues = useMemo(() => {
        return formValues.category || formValues.index;
    }, [formValues]);


    const onFormSubmit = (e) => {
        e.preventDefault();

        let update = Object.fromEntries(Object.entries(formValues).filter(([_, v]) => v !== null && v !== "" && v !== undefined))
        console.log(update);
        axios.put(`/api/category/${categoryId}`, update, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data)

            onSuccess && onSuccess()
            setOpen(false)
            setFormValues({
                category: "",
                index: "",
            });
        }).catch((err) => {
            console.log(err);
            console.log("error uploading");
        });
    }


   
    const getCategories = async () => {
        try {
            const res = await axios.get("/api/category");
            console.log(res);
            setGetAllCategories(res.data);
            setLoading(true);
        } catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
        getCategories();
    }, [categoryId]);


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
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                        opacity: 1,
                    }}
                    onClose={handleClose}
                >
                    Update the category
                </BootstrapDialogTitle>

                <Box
                    sx={{
                        p: 4,
                    }}
                >

                    {/* name grid */}
                    <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
                    
                        <Grid item sm={4} xs={12}>
                            <Typography
                                sx={{
                                    color: "var(--unnamed-color-afaba1)",
                                    font: "normal normal 300 1rem Red Hat Text",
                                    letterSpacing: 0.42,
                                    opacity: 1,
                                }}
                            >
                                new category
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                elevation={5}
                                value={formValues.category}
                                onChange={(e) => {
                                    setFormValues((v) => {
                                        return {
                                            ...v,
                                            category: e.target.value
                                        }
                                    })
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: "#afaba1",
                                        border: "0.5px solid #e2e1df",
                                        background:
                                            "#ffffff 0% 0% no-repeat padding-box",
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Typography
                                sx={{
                                    color: "var(--unnamed-color-afaba1)",
                                    font: "normal normal 300 1rem Red Hat Text",
                                    letterSpacing: 0.42,
                                    opacity: 1,
                                }}
                            >
                                new index
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                elevation={5}
                                value={formValues.index}
                                onChange={(e) => {
                                    setFormValues((v) => {
                                        return {
                                            ...v,
                                            index: e.target.value
                                        }
                                    })
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: "#afaba1",
                                        border: "0.5px solid #e2e1df",
                                        background:
                                            "#ffffff 0% 0% no-repeat padding-box",
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Grid>
                      
                       
                        <Grid item sm={8} xs={12} marginTop={5}>
                            <Button
                                variant="contained"
                                disableElevation
                                disabled={!checkFormValues}
                                onClick={onFormSubmit}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#312E81",
                                        opacity: 0.7,
                                    },
                                    background: "#312E81",
                                }}
                            >
                                <Typography
                                    color="white"
                                    display="inline"
                                    variant="body2"
                                >
                                    Update The category
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </BootstrapDialog>

        </>
    );
};

export default UpdateCategory;
