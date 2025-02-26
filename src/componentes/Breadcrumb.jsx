import React from "react";
import '../componentes/Breadcrumb.css';
import { Breadcrumbs, Link, Box, Typography} from "@material-ui/core";
import { HomeWorkOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

function App(){

    return(
        <Box display="Flex" flexDirection="column" m={10}>
            <Breadcrumbs>
            <Link className="breadcrumb-link" href="/" onClick={() => {}}>
            Inicio
            </Link>
            <Link className="breadcrumb-link" href="/" onClick={() => {}}>
            Perfumes
            </Link>
            <Link className="breadcrumb-link" href="/" onClick={() => {}}>
            Novedades
            </Link>
            <Typography color="textPrimary">Page-1</Typography>
            </Breadcrumbs>

            <Breadcrumbs separator="->">
            <Link className="breascrumb-link" href="/" onClick={() => {}}>
            Pages
            </Link>
            <Typography color="textPrimary">Page-1</Typography>
            </Breadcrumbs>

            <Breadcrumbs>
            <Link className="breadcrumb-link breadcrumb-icon-link" href="/" onClick={() => {}}>
            <HomeWorkOutlined className="breadcrumb-icon" />
            Inicio
            </Link>
            <Typography color="textPrimary">Page-1</Typography>
            </Breadcrumbs>

            <Breadcrumbs maxItems={2}>
            <Typography color="textPrimary">Inicio</Typography>
            <Typography color="textPrimary">Perfumes</Typography>
            <Typography color="textPrimary">All pages</Typography>
            <Typography color="textPrimary">Pages</Typography>
            <Typography color="textPrimary">Page-1</Typography>

        </Breadcrumbs>
         </Box>
    );
}


export default App;
