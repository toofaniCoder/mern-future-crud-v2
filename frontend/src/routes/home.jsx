import { Box, Button, Typography } from '@mui/joy';
import hero from '../assets/hero.svg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      sx={{
        maxWidth: '100vw',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={hero} color="success" style={{ height: '38vmax' }} />
      <Button component={Link} to="students" color="success" size="lg">
        go to dashboard
      </Button>
    </Box>
  );
};

export default Home;
