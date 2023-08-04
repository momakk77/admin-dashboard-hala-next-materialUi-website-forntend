
import Head from 'next/head';
import React, { useEffect, useState } from "react";
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
import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import ChatBubbleLeftEllipsisIcon from '@heroicons/react/24/solid/ChatBubbleLeftEllipsisIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import { styled } from "@mui/material/styles";
import { Link, Card, CardContent, Divider } from '@mui/material';
import ResendMessageDialog from '../components/resendDialog'
import DoneWithEnquire from 'src/components/doneWithEnquireDialog';
import axios from 'axios';

const Img = styled("img")({
    maxWidth: "100%",
    maxHeight: "100%",
});



const Page = () => {
    const [reSend, setReSend] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState("");
    const [Enquires, setEnquires] = useState([]);
    const [loading, setLoading] = useState(false);
    const [doneWithEnquire, setOpenDoneWithEnquire] = React.useState(false);
    

    useEffect(() => {
        getEnquires();
      }, []);
    
   ;
    
   
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    const getEnquires = async ()=> {
      try {
        const res = await axios.get("/api/request/enquire");
        console.log(res);
         setEnquires(res.data);
        setLoading(true);
      } catch (err) {
        alert(err.message);
      }
    }

  const handleClickOpenReSend = (id) => {
    setSelectedItem(id);
    setReSend(true);
  };
  const handleCloseReSend = () => {
    setSelectedItem("");
    setReSend(false);
  };

  const handleClickOpenEnquire = (id) => {
    // setGetAllImages();
    setSelectedItem(id);
    setOpenDoneWithEnquire(true);
  };
  
  const handleCloseEnquire = () => {
    setOpenDoneWithEnquire(false);
  };
return (
    <>
    
        <Head>
            <title>
                EnquiryList | Hala Alabed
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
                                enquiryList
                            </Typography>
                        </Stack>
                    </Stack>

                    <Grid
                        container
                        spacing={3}

                    >
                        {Enquires?.map((enquire, index) => (
                            <Grid key={index}
                            item
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
                                                src={`/${enquire.imagePath}`}
                                                sx={{ width: "100%", objectFit: "contain" }}
                                            />
                                            <Stack
                                                alignItems="flex-start"
                                                direction="column"
                                                justifyContent="center"
                                                spacing={4}
                                                sx={{ p: 2 }}
                                            >
                                                {/* Name */}
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={3}

                                                >
                                                    <SvgIcon
                                                        color="action"
                                                        fontSize="small"
                                                    >
                                                        <UserIcon />
                                                    </SvgIcon>
                                                    <Typography
                                                        color="text.secondary"
                                                        display="inline"
                                                        variant="body2"
                                                    >
                                                        {enquire.name}
                                                    </Typography>
                                                </Stack>
                                                {/* Email */}
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={3}

                                                >
                                                    <SvgIcon
                                                        color="action"
                                                        fontSize="small"
                                                    >
                                                        <EnvelopeIcon />
                                                    </SvgIcon>
                                                    <Typography
                                                        color="text.secondary"
                                                        display="inline"
                                                        variant="body2"
                                                    >
                                                        {enquire.email}
                                                    </Typography>
                                                </Stack>
                                                {/* phone */}
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={3}

                                                >
                                                    <SvgIcon
                                                        color="action"
                                                        fontSize="small"
                                                    >
                                                        <PhoneIcon />
                                                    </SvgIcon>
                                                    <Typography
                                                        color="text.secondary"
                                                        display="inline"
                                                        variant="body2"
                                                    >
                                                        {enquire.phone == "" ? "not available" : enquire.phone}
                                                    </Typography>
                                                </Stack>
                                                {/* Message */}
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={3}

                                                >
                                                    <SvgIcon
                                                        color="action"
                                                        fontSize="small"
                                                    >
                                                        <ChatBubbleLeftEllipsisIcon />
                                                    </SvgIcon>
                                                    <Typography
                                                        color="text.secondary"
                                                        display="inline"
                                                        variant="body2"
                                                    >
                                                        {enquire.message == "" ? "not available" : enquire.message}
                                                    </Typography>
                                                </Stack>
                                            </Stack>

                                        </CardContent>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Divider />
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            justifyContent="space-around"
                                            sx={{ p: 1 }}
                                        >
                                            <Button
                                            onClick={() => {
                                                handleClickOpenReSend(enquire._id);
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
                                                        <PaperAirplaneIcon />
                                                    </SvgIcon>
                                                    <Typography
                                                        color="primary"
                                                        display="inline"
                                                        variant="body2"
                                                    >
                                                        Resend
                                                    </Typography>
                                                </Stack>
                                            </Button>
                                            <Button
                                            onClick={() => {
                                                handleClickOpenEnquire(enquire._id);
                                            }}
                                            >
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={1}
                                                >
                                                    <SvgIcon
                                                        fontSize="small"
                                                        style={{ color: "green" }}
                                                    >
                                                        <CheckCircleIcon />
                                                    </SvgIcon>
                                                    <Typography
                                                        style={{ color: "green" }}
                                                        display="inline"
                                                        variant="body2"
                                                    >
                                                        Done
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
        <ResendMessageDialog setOpen={setReSend} open={reSend} enquireId={selectedItem} onSuccess={()=> getEnquires()} />
        <DoneWithEnquire setOpen={setOpenDoneWithEnquire} open={doneWithEnquire} enquireId={selectedItem} onSuccess={()=> getEnquires()} />
    </>
);
};


Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);


export default Page;





