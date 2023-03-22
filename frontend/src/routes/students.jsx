import { Typography, Grid, Button } from '@mui/joy';
import axios from 'axios';
import { useLoaderData, Link } from 'react-router-dom';
import Wrapper from '../components/wrapper';
import StudentCard from '../components/student-card';

const Students = () => {
  const students = useLoaderData();
  // console.log(students);
  return (
    <Wrapper>
      <Button
        state={{
          title: 'Insert new Student',
          submitLabel: 'Create new Student',
          method: 'post',
          action: `${axios.defaults.baseURL}/api/v1/students`,
        }}
        component={Link}
        to="create"
        color="success"
        sx={{ mb: 2 }}
      >
        Create new Student
      </Button>
      <Grid spacing={2} container>
        {students?.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </Grid>
    </Wrapper>
  );
};
Students.getAllStudents = async () => {
  const response = await axios.get('/api/v1/students');
  return response.data.data;
};
export default Students;
