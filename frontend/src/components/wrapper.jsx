import { Box } from '@mui/joy';

const Wrapper = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        maxWidth: '100vw',
        minHeight: '100vh',
        padding: theme.spacing(4),
        bgcolor: theme.vars.palette.neutral[100],
      })}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
