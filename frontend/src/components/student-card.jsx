import { useRef, useEffect } from 'react';
import axios from 'axios';

import {
  Card,
  CardOverflow,
  Grid,
  Typography,
  AspectRatio,
  Divider,
  Stack,
  IconButton,
  Box,
} from '@mui/joy';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Form, useForm } from 'react-hook-form';
import { Link, useRevalidator } from 'react-router-dom';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';

const StduentCard = ({ student }) => {
  const revalidator = useRevalidator();
  const {
    control,
    register,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const submitRef = useRef(null);
  const profile = watch('profile');

  useEffect(() => {
    if (profile?.[0]?.size > 0) {
      submitRef.current.click();
    }
  }, [profile]);
  return (
    <Grid lg={2} item>
      <Card>
        <Box sx={{ position: 'relative' }}>
          <AspectRatio minHeight="250px" maxHeight="450px">
            {isSubmitting ? (
              <Skeleton inline height={500} />
            ) : (
              <img
                src={`${axios.defaults.baseURL}/uploads/${student.profile}`}
              />
            )}
            <Form
              encType="multipart/form-data"
              control={control}
              method="put"
              action={`${axios.defaults.baseURL}/api/v1/students/${student._id}/upload`}
              fetcher={async (action, { method, values }) => {
                const formData = new FormData();
                formData.append('profile', values.profile[0]);
                const res = await fetch(action, {
                  method,
                  body: formData,
                });
                revalidator.revalidate();
              }}
            >
              <IconButton
                component="label"
                size="sm"
                sx={(theme) => ({
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  zIndex: theme.zIndex.tooltip + 1,
                })}
              >
                <AddPhotoAlternateTwoToneIcon />
                <input type="file" {...register('profile')} hidden />
              </IconButton>
              <input ref={submitRef} hidden type="submit" />
            </Form>
          </AspectRatio>
        </Box>
        <CardOverflow sx={{ py: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <div>
              <Typography level="body1" fontWeight={700}>
                {student.firstName} {student.lastName}
              </Typography>
              <Typography level="body2">
                {student.city}, {student.state}, {student.country}
              </Typography>
            </div>
            <Stack direction="row" spacing={1}>
              <IconButton
                component={Link}
                to={`${student._id}/edit`}
                color="success"
                state={{
                  title: 'Edit Student Profile',
                  submitLabel: 'Update Student',
                  method: 'put',
                  action: `${axios.defaults.baseURL}/api/v1/students/${student._id}`,
                }}
              >
                <EditTwoToneIcon />
              </IconButton>

              <Form
                style={{ display: 'flex' }}
                method="delete"
                control={control}
                action={`${axios.defaults.baseURL}/api/v1/students/${student._id}`}
                onSuccess={() => revalidator.revalidate()}
              >
                <IconButton type="submit" color="danger">
                  <DeleteTwoToneIcon />
                </IconButton>
              </Form>
            </Stack>
          </Stack>
        </CardOverflow>
        <CardOverflow
          variant="soft"
          sx={{ py: 1, display: 'flex', gap: 1, bgcolor: 'background.level1' }}
        >
          <Typography level="body3">pincode: {student.pincode}</Typography>
          <Divider orientation="vertical" />
          <Typography level="body3">gender: {student.gender}</Typography>
        </CardOverflow>
      </Card>
    </Grid>
  );
};

export default StduentCard;
