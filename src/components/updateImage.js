import { Box, Stack, Grid, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import Paper from "@mui/material/Paper";
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

const Img = styled("img")({
    display: "block",
    width: "100%",
    objectFit: "cover",
    margin: "auto",
});

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



const UpdateImage = ({ open, setOpen, imageId, onSuccess }) => {


    const [getImage, setGetImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [getAllCategories, setGetAllCategories] = useState([]);
    const [formValues, setFormValues] = useState({});

    const checkFormValues = useMemo(() => {
        return formValues.photo || formValues.title || formValues.description || formValues.size || formValues.category;
    }, [formValues]);


    const onFormSubmit = (e) => {
        e.preventDefault();

        let update = Object.fromEntries(Object.entries(formValues).filter(([_, v]) => v !== null && v !== "" && v !== undefined))
        console.log(update);
        axios.put(`/api/image/${imageId}`, update, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data)

            onSuccess && onSuccess()
            setOpen(false)
            setFormValues({
                photo: "",
                title: "",
                description: "",
                size: "",
                category: "",
            });
        }).catch((err) => {
            console.log(err);
            console.log("error uploading");
        });
    }


    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    }
    const getAImage = async (imageId) => {
        try {
            const res = await axios.get(`/api/image/${imageId}`, config);
            console.log(res.data);
            setGetImage(res.data.data);
            setLoading(true);
        } catch (err) {
            alert(err.message);
        }
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
        imageId && getAImage(imageId);
    }, [imageId]);


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
                    Update the image
                </BootstrapDialogTitle>

                <Box
                    sx={{
                        p: 4,
                    }}
                >

                    <Paper
                        //key={getImage._id}
                        elevation={5}
                        sx={{
                            p: 1,
                            flexGrow: 1,
                            border: "0.5px solid #e2e1df",
                            background:
                                "#ffffff 0% 0% no-repeat padding-box",
                            borderRadius: 2,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item sm={3}>
                                <Img
                                    sx={{ height: "100%" }}
                                    alt="wow"
                                    src={getImage.imagePath}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography
                                    sx={{
                                        font: "var(--unnamed-font-style-normal) normal 300 0.8rem Red Hat Text",
                                        color: "var(--unnamed-color-afaba1)",
                                        letterSpacing: 0.33,
                                        opacity: 1,
                                    }}
                                >
                                    {getImage.title},
                                    <br /> {getImage.description} <br /> {getImage.size} <br /> 22 1/8x
                                    29 7/8 in <br /> Framed
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
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
                                new title
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                elevation={5}
                                value={formValues.title}
                                onChange={(e) => {
                                    setFormValues((v) => {
                                        return {
                                            ...v,
                                            title: e.target.value
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
                                new size
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={formValues.size}
                                onChange={(e) => {
                                    setFormValues((v) => {
                                        return {
                                            ...v,
                                            size: e.target.value
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
                        {/* phone grid */}
                        <Grid item sm={4} xs={12}>
                            <Typography
                                sx={{
                                    color: "var(--unnamed-color-afaba1)",
                                    font: "normal normal 300 1rem Red Hat Text",
                                    letterSpacing: 0.42,
                                    opacity: 1,
                                }}
                            >
                                new description
                            </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={formValues.description}
                                onChange={(e) => {
                                    setFormValues((v) => {
                                        return {
                                            ...v,
                                            description: e.target.value
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
                        {/* massage grid */}
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
                                required
                                select
                                defaultValue=""
                                helperText="Please select the new category of image"
                                onChange={(e) => {
                                    setFormValues((v) => {
                                        return {
                                            ...v,
                                            category: e.target.value
                                        }
                                    })
                                }}
                                value={formValues.category}
                            >
                                {loading && getAllCategories?.map((getCategories) => (
                                    <MenuItem key={getCategories._id} value={getCategories.category}>
                                        {getCategories.category}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                                    Update The Image
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </BootstrapDialog>

        </>
    );
};

export default UpdateImage;
