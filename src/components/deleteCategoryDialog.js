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



const DeleteCategory = ({ open, setOpen, categoryId, onSuccess }) => {



    const [loading, setLoading] = useState(false);
   

const deleteCategory = async ()=> {
  try {
    const res = await axios.delete(`/api/category/${categoryId}`, {
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
                    Delete the category
                </BootstrapDialogTitle>

                <Box
                    sx={{
                        p: 4,
                    }}
                >

            
                    <Grid item sm={4} xs={12}>
                        <DialogContent >
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    marginBottom: "1rem"
                                }}
                            >
                                Do you want to delete this category?
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
                            <Button autoFocus onClick={deleteCategory} sx={{ color: "red" }}>
                                Yes
                            </Button>
                            

                        </DialogActions>
                    </Grid>

                </Box>
            </BootstrapDialog>

        </>
    );
};

export default DeleteCategory;
