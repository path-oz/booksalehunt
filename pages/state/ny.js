import {
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import DropDown from "../../components/DropDown";
import BooksaleCards from "../../components/BooksaleCards";
import { Grid } from "@mui/material";
import { connectToDatabse } from '../../util/mongodb';
import Head from "next/head";
import { makeStyles } from "@mui/styles";

export default function newyork({booksales}) {


  return (

    <>
      <CssBaseline />
      <main>
        <div>
          <Container maxWidth="md">
            <Head>
              <title>NY Book Sales</title>
              <meta name="viewport" property="og:title"  key="title" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              
              
              New York
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <DropDown/>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              {booksales.map((booksale) => (
                <Grid key={booksale.id} item xs={12} sm={6} md={4} xl={2}>
                  <BooksaleCards booksale={booksale} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps( ) {
  const { db } = await connectToDatabse();

  const data = await db.collection("states").find({"state":"New Jersey"}).limit(20).toArray();

  const booksales = JSON.parse(JSON.stringify(data));
  console.log(booksales);
  const filtered = booksales.map(booksale => {
    return {
      library: booksale.library,
    }

  })

  return {
    props: { booksales: filtered },
  }
}
