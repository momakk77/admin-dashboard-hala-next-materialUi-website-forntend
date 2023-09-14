import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import Paper from "@mui/material/Paper";
import { SvgIcon } from '@mui/material';
import { useEffect, useState } from "react";
import axios from 'axios';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';




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



const DeleteImage = ({ open, setOpen, imageId, onSuccess }) => {


    const [getImage, setGetImage] = useState([]);
    const [loading, setLoading] = useState(false);
   

const deleteImage = async ()=> {
  try {
    const res = await axios.delete(`/api/image/${imageId}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    console.log("sss");
    onSuccess && onSuccess()
    setOpen(false)
    setLoading(true);
  } catch (err) {
    alert(err.message);
  }
}

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    }
    const getAImage = async (imageId) => {
        try {
            const res = await axios.get(`/api/image/${imageId}`, config);
            console.log("sss");
            
            setGetImage(res.data.data);
            setLoading(true);
        } catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
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
                    Delete the image
                </BootstrapDialogTitle>

                <Box
                    sx={{
                        p: 4,
                    }}
                >

                    <Paper
                        elevation={5}
                        sx={{
                            p: 1,
                            flexGrow: 1,
                            border: "0.5px solid #e2e1df",
                            background:
                                "#ffffff 0% 0% no-repeat padding-box",
                            borderRadius: 2,
                            marginBottom: "1rem",
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
                                    <br /> {getImage.description} <br /> {getImage.size} <br />
                                    {getImage.sizeInch} <br /> {getImage.framed}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid item sm={4} xs={12}>
                        <DialogContent >
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    marginBottom: "1rem"
                                }}
                            >
                                Do you want to delete this image?
                            </Typography>
                        </DialogContent>
                    </Grid>
                    <Grid item sm={4} xs={12}
                    sx={{ marginTop: "1rem" }}
                    >
                        <DialogActions>
                        <Button autoFocus onClick={handleClose} sx={{ color: "red" }}>
                                No
                            </Button>
                            <Button autoFocus onClick={deleteImage} sx={{ color: "red" }}>
                                Yes
                            </Button>
                            

                        </DialogActions>
                    </Grid>

                </Box>
            </BootstrapDialog>

        </>
    );
};

export default DeleteImage;
