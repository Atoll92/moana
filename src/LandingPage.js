import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const projects = [
  {
    title: '17th Century Shipwreck',
    description: 'Explore the remains of a shipwreck from the 17th century, discovered deep beneath the ocean.',
    image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/Buzos_anclas_las-Aves_ByW1-scaleCd-2048x2048.jpg',
  },
  {
    title: 'Lake Parime',
    description: 'Journey to the lost lake Parime, once believed to hide the legendary El Dorado.',
    image: 'https://fundacionmanoa.org/wp-content/uploads/2023/01/FM4.jpg',
  },
  {
    title: 'Ancient Amazonian Settlements',
    description: 'Discover the traces of ancient civilizations deep within the Amazon rainforest.',
    image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/canaima-C.jpg',
  },
];

const LandingPage = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Humanscape
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Unveiling the hidden stories of the Americas through remote sensing archaeology and immersive VR experiences.
      </Typography>
      
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ pt: '0%' }} // 16:9 aspect ratio
                image={project.image}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography>
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingPage;
