import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const [name, setName]=useState("");
  const [funds_available, set_funds_available] = useState(0);
  const [email,setemail]=useState("");
  const [pass,setpass]=useState("");
  const router = useRouter();
  const [error_l,seterror]=useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick =async  () => {
    // axios.post('http://localhost:8000/login', {"email":"test@gmail.com","password":"1234"}, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: true
    //   })
    //   .then(response => {
    //     if(response.data['status 200']==='s'){
    //       console.log("woeking")
    //       router.push('/');
    //     }
        
       
    //           })
    //   .catch(error => {
    //     console.error('Error:', error);
        
    //   });
    // router.push('/')

    
    const postData = { "name": name, "email":email,"password":pass, "cf": Number(funds_available) }; 
    // console.log(postData)
    axios.post('http://localhost:8000/register', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
      })
      .then(response => {
        // console.log(response.data)
        if(response.data==='Registered'){
          // console.log("working")
          router.push('/login');
        }
        
       
              })
      .catch(error => {
        console.error('Error:', error);
        seterror("Credentials are wrong")
        
      });
    
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
      <TextField name="name" label="Name"  onChange={(ev) => setName(ev.target.value)}/>

        <TextField name="email" label="Email address"  onChange={(ev) => setemail(ev.target.value)}/>

        <TextField
        onChange={(ev) => setpass(ev.target.value)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          
        />
        <TextField name="funds_available" label="Funds Available"  onChange={(ev) => set_funds_available(ev.target.value)}/>
        
      </Stack>
          <div>
          <p>{error_l}</p>
          </div>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Get started with Stocx</Typography>


          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
