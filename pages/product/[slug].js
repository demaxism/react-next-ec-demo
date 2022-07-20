import data from '../../utils/data';
import { useRouter } from 'next/router'
import React from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image'; 
import { Grid, Link, List, ListItem, Typography, Card, Button } from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../../utils/styles';

export default function ProductScreen() {
  const classes = useStyles();
  const router = useRouter();
  const {slug} = router.query;
  const product = data.products.find(a => a.slug === slug);
  if (!product) {
    return <div>Product not found</div>
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href='/' passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={6}>
          <Image src={product.image} alt={product.name} width={640} height={640} layout='responsive'>
          </Image>
        </Grid>
        <Grid item md={3} xs={3}>
          <List>
            <ListItem>
              <Typography component='h1' variant='h1'>{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              Brand: {product.brand}
            </ListItem>
            <ListItem>
              Rating: {product.rating} stars ({product.numReviews})
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}><Typography>Price</Typography></Grid>
                  <Grid item xs={6}><Typography>${product.price}</Typography></Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}><Typography>Status</Typography></Grid>
                  <Grid item xs={6}><Typography>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</Typography></Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant='contained' color='primary'>
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
