import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { CssBaseline } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Paper } from '@material-ui/core/';
import { Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random',
        backgroundSize: 'cover',
    },
    Paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

async function loginUser(credentials) {
  return fetch('http://localhost:3000/api/auth/signin', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Signin() {
  const classes = useStyles();
  //const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      //email,
      username,
      password,
    });
    /*if ('accessToken' in response) {
      swal({
        title: "Success",
        text: "ล็อกอินสำเร็จ",
        icon: "success",
        buttons: "OK"
      })
        .then((value) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.username));
          window.location.href = "/profile";
        });
    } else {
      swal("Failed", response.message, "error");
    }*/

    if (response.accessToken === null) {
      swal("Failed", response.message, "error");
    } else {
      swal({
        title: "Success",
        text: "ล็อกอินสำเร็จ",
        icon: "success",
        buttons: "OK",
      }).then((value) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.username));
         window.location.href = "/profile";
      });
    }
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}