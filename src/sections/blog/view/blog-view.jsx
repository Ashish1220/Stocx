import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { faker } from '@faker-js/faker';

// import { posts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function BlogView() {
  const video_data = [
    'Share Market Explained by Dhruv Rathee (Hindi) | Learn Everything on Investing Money',
    'Simple Explanation Of Stock Market',
    'How does the stock market work? - Oliver Elfenbaum',
    'This tool will help improve your critical thinking - Erick Wilberding',
  ];
  const posts = [
    {
      id: faker.string.uuid(),
      cover: `/assets/images/covers/cover_1.png`,
      title:     'Share Market Explained by Dhruv Rathee (Hindi) | Learn Everything on Investing Money',
      createdAt: faker.date.past(),
      view: faker.number.int(99999),
      comment: faker.number.int(99999),
      share: faker.number.int(99999),
      favorite: faker.number.int(99999),
      author: {
        name: faker.person.fullName(),
        avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
      },
    },
    {
      id: faker.string.uuid(),
      cover: `/assets/images/covers/cover_2.png`,
      title: 'Simple Explanation Of Stock Market',

      createdAt: faker.date.past(),
      view: faker.number.int(99999),
      comment: faker.number.int(99999),
      share: faker.number.int(99999),
      favorite: faker.number.int(99999),
      author: {
        name: faker.person.fullName(),
        avatarUrl: `/assets/images/avatars/avatar_2.jpg`,
      },
    },
    {
      id: faker.string.uuid(),
      cover: `/assets/images/covers/cover_3.png`,
      title:     'How does the stock market work? - Oliver Elfenbaum',

      createdAt: faker.date.past(),
      view: faker.number.int(99999),
      comment: faker.number.int(99999),
      share: faker.number.int(99999),
      favorite: faker.number.int(99999),
      author: {
        name: faker.person.fullName(),
        avatarUrl: `/assets/images/avatars/avatar_3.jpg`,
      },
    },
    {
      id: faker.string.uuid(),
      cover: `/assets/images/covers/cover_4.png`,
      title:     'This tool will help improve your critical thinking - Erick Wilberding',
      createdAt: faker.date.past(),
      view: faker.number.int(99999),
      comment: faker.number.int(99999),
      share: faker.number.int(99999),
      favorite: faker.number.int(99999),
      author: {
        name: faker.person.fullName(),
        avatarUrl: `/assets/images/avatars/avatar_4.jpg`,
      },
    },
    {
      id: faker.string.uuid(),
      cover: `/assets/images/covers/cover_5.png`,
      title: 'Why can’t prices just stay the same?',
      createdAt: faker.date.past(),
      view: faker.number.int(99999),
      comment: faker.number.int(99999),
      share: faker.number.int(99999),
      favorite: faker.number.int(99999),
      author: {
        name: faker.person.fullName(),
        avatarUrl: `/assets/images/avatars/avatar_5.jpg`,
      },
    },
  ];
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Lessons</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Contribute
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
