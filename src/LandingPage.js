import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define project data for both languages
const projects = {
  en: [
    {
      id: 'shipwreck',
      title: '17th Century Shipwreck',
      description: 'Explore the remains of a shipwreck from the 17th century, discovered deep beneath the ocean.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/Buzos_anclas_las-Aves_ByW1-scaleCd-2048x2048.jpg',
    },
    {
      id: 'lake-parime',  
      title: 'Lake Parime',
      description: 'Journey to the lost lake Parime, once believed to hide the legendary El Dorado.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/01/FM4.jpg',
    },
    {
      id: 'amazon-settlements',
      title: 'Ancient Amazonian Settlements',
      description: 'Discover the traces of ancient civilizations deep within the Amazon rainforest.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/canaima-C.jpg',

    },
  ],
  fr: [
    {
      id: 'shipwreck',  
      title: 'Épave du XVIIe siècle',
      description: 'Explorez les vestiges d\'une épave du XVIIe siècle, découverte au fond de l\'océan.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/Buzos_anclas_las-Aves_ByW1-scaleCd-2048x2048.jpg',
    },
    {
      id: 'lake-parime',    
      title: 'Lac Parime',
      description: 'Voyagez vers le lac perdu Parime, autrefois censé cacher le légendaire El Dorado.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/01/FM4.jpg',
    },
    {
      id: 'amazon-settlements',
      title: 'Anciennes colonies amazoniennes',
      description: 'Découvrez les traces des anciennes civilisations au cœur de la forêt amazonienne.',
      image: 'https://fundacionmanoa.org/wp-content/uploads/2023/10/canaima-C.jpg',
      
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
          {language === 'en' ? 'Humanscape' : 'Humanscape'}
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
                onClick={() => handleProjectClick(project.id)}
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  
  export default LandingPage;

