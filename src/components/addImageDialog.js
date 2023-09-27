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
import MenuItem from '@mui/material/MenuItem';

const frameds = [
  {
      value: ' ',
      label: 'noValue',
  },
  {
      value: 'in Framed',
      label: 'in Framed',
  },
  {
      value: 'Without Framed',
      label: 'Without Framed',
  },

];


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

const AddImageDialog = ({ open, setOpen, onSuccess }) => {

  const [formValues, setFormValues] = useState({
      photo: "",
          title: "",
          description: "",
          size: "",
          sizeInch: "",
          framed: "",
          category: "",
          index: "",
  });
  const [getAllCategories, setGetAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkFormValues = useMemo(()=>{
    return formValues.photo && formValues.category && formValues.index;
  },[formValues]); 
    

  const onFormSubmit = (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append('photo', formValues.photo);
    formData.append('title', formValues.title);
    formData.append('index', formValues.index);
    formData.append('description', formValues.description);
    formData.append('size', formValues.size);
    formData.append('category', formValues.category);
    formData.append('sizeInch', formValues.sizeInch);
    formData.append('framed', formValues.framed);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //     
    //   },
    // }
    axios.post('/api/image', formData,  {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
    }).then((response) => {
      console.log("ssss")
      onSuccess && onSuccess()
      setOpen(false)
      setFormValues({
          photo: "",
          title: "",
          description: "",
          size: "",
          sizeInch: "",
          framed: "",
          category: "",
          index: "",
        });
    }).catch((err) => {
      console.log(err);
      console.log("error uploading");
    });
  }

  useEffect(() => {
    getCategories();
  },[]);
const getCategories = async ()=> {
  try {
    const res = await axios.get("/api/category");
    console.log(res);
    setGetAllCategories(res.data);
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
          Add new image
        </BootstrapDialogTitle>

        <Box
          sx={{
            p: 4,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label" fullWidth sx={{
              "&:hover": {
                backgroundColor: "#312E81",
                opacity: 0.7,
              },
              background: "#312E81",
            }}>
              Upload Image *
              <input
                required
                hidden
                accept="image/*"
                multiple
                type="file"
                //value={formValues.photo}
                onChange={(e) => {
                  setFormValues((v) => {
                    return {
                      ...v,
                      photo: e.target.files[0]
                    }
                  })
                }} />
            </Button>
          </Stack>
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
                title 
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
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
                    color: "var(--unnamed-color-afaba1)",
                    border: "0.5px solid var(--unnamed-color-e2e1df)",
                    background:
                      "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            {/* email grid */}
            <Grid item sm={4} xs={12}>
              <Typography
                sx={{
                  color: "var(--unnamed-color-afaba1)",
                  font: "normal normal 300 1rem Red Hat Text",
                  letterSpacing: 0.42,
                  opacity: 1,
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
            <Grid item sm={4} xs={12}>
              <Typography
                sx={{
                  color: "var(--unnamed-color-afaba1)",
                  font: "normal normal 300 1rem Red Hat Text",
                  letterSpacing: 0.42,
                  opacity: 1,
                }}
              >
                size 
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
             <Grid item sm={4} xs={12}>
              <Typography
                sx={{
                  color: "var(--unnamed-color-afaba1)",
                  font: "normal normal 300 1rem Red Hat Text",
                  letterSpacing: 0.42,
                  opacity: 1,
                }}
              >
                sizeByInch 
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                value={formValues.sizeInch}
                onChange={(e) => {
                  setFormValues((v) => {
                    return {
                      ...v,
                      sizeInch: e.target.value
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
                description 
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
            <Grid item sm={4} xs={12}>
              <Typography
                sx={{
                  color: "var(--unnamed-color-afaba1)",
                  font: "normal normal 300 1rem Red Hat Text",
                  letterSpacing: 0.42,
                  opacity: 1,
                }}
              >
                framed 
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                select
                defaultValue=""
                onChange={(e) => {
                  setFormValues((v) => {
                    return{
                      ...v,
                      framed: e.target.value
                    }
                  })
                }}
                value= {formValues.framed}
                >  
                {...frameds.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>

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
                category *
              </Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                required
                select
                defaultValue=""
                onChange={(e) => {
                  setFormValues((v) => {
                    return{
                      ...v,
                      category: e.target.value
                    }
                  })
                }}
                value= {formValues.category}
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
                  Add Image
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </BootstrapDialog>

    </>
  );
};

export default AddImageDialog;
