
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Pencil from '@heroicons/react/24/solid/PencilSquareIcon';
import Trash from '@heroicons/react/24/solid/TrashIcon';
import { styled } from "@mui/material/styles";
import {  Card, CardContent, Divider } from '@mui/material';
import AddImageDialog from '../components/addImageDialog'
import UpdateImage from '../components/updateImage'
import DeleteImage from '../components/deleteImageDialog'
import axios from 'axios';

const Img = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});





const Page = () => {

  useEffect(() => {
    getImages();
  },[]);

const [selectedImageId, setSelectedImageId] = useState("");
const [openAddImage, setOpenAddImage] = React.useState(false);
const [openUpdateImage, setOpenUpdateImage] = React.useState(false);
const [openDeleteImage, setOpenDeleteImage] = React.useState(false);

const [getAllImages, setGetAllImages] = useState([]);
const [loading, setLoading] = useState(false);


const getImages = async ()=> {
  try {
    const res = await axios.get("/api/image");
    console.log(res);
    setGetAllImages(res.data);
    setLoading(true);
  } catch (err) {
    alert(err.message);
  }
}


  const handleClickOpenAddImage = () => {
    // setGetAllImages();
    setOpenAddImage(true);
  };
  
  const handleCloseAddImage = () => {
    setOpenAddImage(false);
  };
  
  const handleClickOpenUpdateImage = (id) => {
    // setGetAllImages();
    setSelectedImageId(id);
    setOpenUpdateImage(true);
  };
  
  const handleCloseUpdateImage = () => {
    setOpenUpdateImage(false);
  };

  const handleClickOpenDeleteImage = (id) => {
    // setGetAllImages();
    setSelectedImageId(id);
    setOpenDeleteImage(true);
  };
  
  const handleCloseDeleteImage = () => {
    setOpenDeleteImage(false);
  };
  return (
    <>

      <Head>
        <title>
          Images | Hala Alabed
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">

          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  images
                </Typography>
              </Stack>
              <div>
                <Button
                  onClick={() => {
                    handleClickOpenAddImage();
                  }}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>

            <Grid
              container
              spacing={4}
            >
              {loading && getAllImages?.map((getImages) => (
                <Grid item
                  key={getImages._id}
                  container
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                  sx={{alignItems: "center" }}
                >
                  <Grid item sx={{ flex: 2, display: "flex" }}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                      }}
                    >
                      <CardContent>
                          <Img
                            alt="complex"
                            src={getImages.imagePath}
                            sx={{ width: "100%", objectFit: "contain" }}
                          />
                        <Typography
                          sx={{
                            font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 14px/var(--unnamed-line-spacing-26) Red Hat Tex",
                            color: "var(--unnamed-color-7f7c76)",
                            letterSpacing: 0.42,
                            opacity: 1,
                          }}
                        >
                          {getImages.title}
                        </Typography>
                        <Typography
                          sx={{
                            font: "var(--unnamed-font-style-normal) normal 300 12px/16px Red Hat Text",
                            color: "var(--unnamed-color-afaba1)",
                            letterSpacing: 0.36,
                            opacity: 1,
                          }}
                        >
                          {getImages.description} <br /> {getImages.size}
                        </Typography>
                      </CardContent>
                      <Box sx={{ flexGrow: 1 }} />
                      <Divider />
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ p: 2 }}
                      >
                        <Button
                        onClick={() => {
                          handleClickOpenDeleteImage(getImages._id);
                        }}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                          >
                            <SvgIcon
                              style={{ color: "red" }}
                              fontSize="small"
                            >
                              <Trash />
                            </SvgIcon>
                            <Typography
                              style={{ color: "red" }}
                              display="inline"
                              variant="body2"
                            >
                              DeleteImage
                            </Typography>
                          </Stack>
                        </Button>
                        <Button
                          onClick={() => {
                            handleClickOpenUpdateImage(getImages._id);
                            
                          }}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                          >
                            <SvgIcon
                              color="primary"
                              fontSize="small"
                            >
                              <Pencil />
                            </SvgIcon>
                            <Typography
                              color="primary"
                              display="inline"
                              variant="body2"
                            >
                              UpdateImage
                            </Typography>
                          </Stack>
                        </Button>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
      <AddImageDialog setOpen={setOpenAddImage} open={openAddImage} onSuccess={()=> getImages()}/>
      <UpdateImage setOpen={setOpenUpdateImage} open={openUpdateImage} imageId={selectedImageId} onSuccess={()=> getImages()} />
      <DeleteImage setOpen={setOpenDeleteImage} open={openDeleteImage} imageId={selectedImageId} onSuccess={()=> getImages()} />
    </>

  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Page;




