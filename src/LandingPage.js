import React, { useState } from 'react';
import { Container, Typography, Grid, Card, Box, CardContent, CardMedia, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define project data for both languages
const projects = {
  en: [
    {
      id: 'shipwreck',
      title: '17th Century Shipwreck',
      description: 'Explore the remains of a shipwreck from the 17th century, discovered deep beneath the ocean.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/Buzos_anclas_las-Aves_ByW1-scaleCd-2048x2048.jpg',
      researchLink: 'https://www.researchgate.net/publication/376078121_The_Shipwreck_of_the_French_Fleet_in_Las_Aves_de_Sotavento_Venezuela_-_University_Press_of_Florida-',
    },
    {
      id: 'lake-parime',  
      title: 'Lake Parime',
      description: 'Journey to the lost lake Parime, once believed to hide the legendary El Dorado.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/01/FM4.jpg',
      researchLink: 'https://www.researchgate.net/publication/358658229_Remote_Sensing_Archaeology_-_Searching_for_Lake_Parime_from_Space_-pdf',
    },
    {
      id: 'amazon-settlements',
      title: 'New Rock Art site Complex from the Canaima National Park',
      description: 'Discover the traces of ancient civilizations deep within the Amazon rainforest.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/canaima-C.jpg',
      researchLink: 'https://www.researchgate.net/publication/374660579_New_Rock_Art_Site_Complex_In_The_Arauak_River_Valley_Southeastern_Venezuela',
    },
  ],
  fr: [
    {
      id: 'shipwreck',  
      title: 'Épave du XVIIe siècle',
      description: 'Explorez les vestiges d\'une épave du XVIIe siècle, découverte au fond de l\'océan.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/Buzos_anclas_las-Aves_ByW1-scaleCd-2048x2048.jpg',
      researchLink: 'https://www.researchgate.net/publication/376078121_The_Shipwreck_of_the_French_Fleet_in_Las_Aves_de_Sotavento_Venezuela_-_University_Press_of_Florida-',
    },
    {
      id: 'lake-parime',    
      title: 'Lac Parime',
      description: 'Voyagez vers le lac perdu Parime, autrefois censé cacher le légendaire El Dorado.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/01/FM4.jpg',
      researchLink: 'https://www.researchgate.net/publication/358658229_Remote_Sensing_Archaeology_-_Searching_for_Lake_Parime_from_Space_-pdf',
    },
    {
      id: 'amazon-settlements',
      title: 'Nouveau site d art pariétal au parc Canaima',
      description: 'Découvrez les traces des anciennes civilisations au cœur du parc Canaima, au sud du Vénezuela.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/canaima-C.jpg',
      researchLink: 'https://www.researchgate.net/publication/374660579_New_Rock_Art_Site_Complex_In_The_Arauak_River_Valley_Southeastern_Venezuela',
    },
  ],
};

const LandingPage = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();
  
    const toggleLanguage = () => {
      setLanguage(language === 'en' ? 'fr' : 'en');
    };
  
    const handleProjectClick = (projectId) => {
      window.open(`/scene/${projectId}`, '_blank'); // Opens in a new tab
    };
  
    return (
      <Container sx={{ py: 8 }}>
        <Button variant="outlined" onClick={toggleLanguage} sx={{ mb: 4 }}>
          {language === 'en' ? 'Français' : 'English'}
        </Button>
        <Typography variant="h3" align="center" gutterBottom>
          {language === 'en' ? 'Proof of concept' : 'Proof of concept'}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          {language === 'en'
            ? 'Unveiling the hidden stories of the Americas through remote sensing archaeology and immersive VR experiences.'
            : 'Dévoiler les histoires cachées des Amériques grâce à l\'archéologie par télédétection et à des expériences VR immersives.'}
        </Typography>
  
        <Grid container spacing={4}>
          {projects[language].map((project, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              >
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
                  <Link href={project.researchLink} target="_blank" rel="noopener" sx={{ mt: 2, display: 'block', textDecoration: 'none' }}>
                    {language === 'en' ? 'Learn more' : 'En savoir plus'}
                  </Link>
                  <Link
                    onClick={() => handleProjectClick(project.id)}
                    sx={{ mt: 1, display: 'block', textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {language === 'en' ? 'Explore' : 'Explorer'}
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

          {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          mt: 4,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
        <Grid item>
            <img src="./moana.png" alt="Logo 2" style={{ height: 80, filter: 'invert(100%)' }} />
          </Grid>
          <Grid item>
            <img src="./dg.png" alt="Logo 1" style={{ height: 70 }} />
          </Grid>
         
        </Grid>
      </Box>
    
      </Container>
    );
  };
  
  export default LandingPage;
