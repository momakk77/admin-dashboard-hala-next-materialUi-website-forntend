
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
import Trash from '@heroicons/react/24/solid/TrashIcon';
import Pencil from '@heroicons/react/24/solid/PencilSquareIcon';
import {  Card, CardContent, Divider } from '@mui/material';
import AddCategoryDialog from '../components/addCategoryDialog';
import DeleteCategory from '../components/deleteCategoryDialog'
import UpdateCategory from '../components/updateCategory'
import axios from 'axios';




const Page = () => {

  useEffect(() => {
    getCategories();
  },[]);

const [selectedCategoryId, setSelectedCategoryId] = useState("");
const [OpenAddCategory, setOpenAddCategory] = React.useState(false);
const [openDeleteCategory, setOpenDeleteCategory] = React.useState(false);
const [openUpdateCategory, setOpenUpdateCategory] = React.useState(false);

const [getAllCategories, setGetAllCategories] = useState([]);
const [loading, setLoading] = useState(false);


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


  const handleClickOpenAddCategory = () => {
    // setGetAllImages();
    setOpenAddCategory(true);
  };
  
  const handleCloseAddCategory = () => {
    setOpenAddCategory(false);
  };
  

  

  const handleClickOpenDeleteCategory = (id) => {
    // setGetAllImages();
    setSelectedCategoryId(id);
    setOpenDeleteCategory(true);
  };
  
  const handleCloseDeleteCategory = () => {
    setOpenDeleteCategory(false);
  };

  const handleClickOpenUpdateCategory = (id) => {
    // setGetAllImages();
    setSelectedCategoryId(id);
    setOpenUpdateCategory(true);
  };
  
  const handleCloseUpdateCategory = () => {
    setOpenUpdateCategory(false);
  };
  return (
    <>

      <Head>
        <title>
          Category | Hala Alabed
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
                  categories
                </Typography>
              </Stack>
              <div>
                <Button
                  onClick={() => {
                    handleClickOpenAddCategory();
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
              {loading && getAllCategories?.map((getCategories) => (
                <Grid item
                  key={getCategories._id}
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
                    
                        <Typography
                          sx={{
                            font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 14px/var(--unnamed-line-spacing-26) Red Hat Tex",
                            color: "var(--unnamed-color-7f7c76)",
                            letterSpacing: 0.42,
                            opacity: 1,
                          }}
                        >
                         Category Name:  {getCategories.category} <br/>
                         Category Order Index:  {getCategories.index}
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
                          handleClickOpenDeleteCategory(getCategories._id);
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
                              DeleteCategory
                            </Typography>
                          </Stack>
                        </Button>
                        <Button
                          onClick={() => {
                            handleClickOpenUpdateCategory(getCategories._id);
                            
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
                              UpdateCategory
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
      <AddCategoryDialog setOpen={setOpenAddCategory} open={OpenAddCategory} onSuccess={()=> getCategories()}/>
      <DeleteCategory setOpen={setOpenDeleteCategory} open={openDeleteCategory} categoryId={selectedCategoryId} onSuccess={()=> getCategories()} />
      <UpdateCategory setOpen={setOpenUpdateCategory} open={openUpdateCategory} categoryId={selectedCategoryId} onSuccess={()=> getCategories()} />
    </>

  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Page;




