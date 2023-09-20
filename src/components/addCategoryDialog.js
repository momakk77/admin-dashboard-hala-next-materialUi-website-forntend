import { Box, Stack, Grid, Typography } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PropTypes, { object } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import TextField from "@mui/material/TextField";
import { SvgIcon } from '@mui/material';
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

const AddCategoryDialog = ({ open, setOpen, onSuccess }) => {

  const [formValues, setFormValues] = useState({});


  const checkFormValues = useMemo(()=>{
    return formValues.category;
  },[formValues]); 
    

  const onFormSubmit = (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append('category', formValues.category);
    formData.append('index', formValues.index);

    axios.post('/api/category', formData,  {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
    }
    }).then((response) => {
      console.log("ssss")
      console.log(response)
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
          Add New Category
        </BootstrapDialogTitle>

        <Box
          sx={{
            p: 4,
          }}
        >
          
            <Grid item sm={4} xs={12}>
              <Typography
                sx={{
                  color: "var(--unnamed-color-afaba1)",
                  font: "normal normal 300 1rem Red Hat Text",
                  letterSpacing: 0.42,
                  opacity: 1,
                  marginBottom: "1rem",
                }}
              >
                category *
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
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
                    color: "var(--unnamed-color-afaba1)",
                    border: "0.5px solid var(--unnamed-color-e2e1df)",
                    background:
                      "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
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
                  marginBottom: "1rem",
                }}
              >
                index * 
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
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
              variant="contained"
              disableElevation
              disabled={!checkFormValues}
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
                  onClick={onFormSubmit}
                  
                >
                  Add Category
                </Typography>
              </Button>
            </Grid>
        </Box>
      </BootstrapDialog>

    </>
  );
};

export default AddCategoryDialog;
