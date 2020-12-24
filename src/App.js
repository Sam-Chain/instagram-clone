import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import Upload from './Upload';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [ open, setOpen ] = useState(false);
  const [ openSignIn, setOpenSignIn ] = useState(false);
  const [ posts, setPost ] = useState([]);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);

  const signUp = event=>{
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username,
      });
    })
    .catch((error)=>alert(error.message))

    setOpen(false);
  }
  const signIn = event=>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false)
  }
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(authUser=>{
      if(authUser){
        //user loged in
        console.log(authUser);
        setUser(authUser);
      }else{
        //user loged out
        setUser(null)
      }
    })

    return ()=>{
      //perform some cleanup
      unsubscribe();
    }

  },[username, user])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot=>{
      setPost(snapshot.docs.map(doc=>({
        id: doc.id,
        post: doc.data(),
      })))
    })
  }, [])
  
  return (
    <div className="app">
      { user ? (
        <Upload username={user.displayName}/>
      ) : (
        <h3>Login to upload</h3>
      ) }

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              {/* <center> */}
                <img 
                  className="app__headerImage"
                  src="http://pngimg.com/uploads/instagram/instagram_PNG5.png" 
                  alt="instagram"
                />

                <Input 
                  placeholder="Username"
                  value={username}
                  type="text"
                  onChange={e=>setUsername(e.target.value)}
                />

                <Input 
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={e=>setEmail(e.target.value)}
                />

                <Input 
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={e=>setPassword(e.target.value)}
                />

                <Button type="submit" onClick={signUp}>Sign up</Button>
              {/* </center> */}
            </form>
            
          </div>
      </Modal>
      
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              {/* <center> */}
                <img 
                  className="app__headerImage"
                  src="http://pngimg.com/uploads/instagram/instagram_PNG5.png" 
                  alt="instagram"
                />

                <Input 
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={e=>setEmail(e.target.value)}
                />

                <Input 
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={e=>setPassword(e.target.value)}
                />

                <Button type="submit" onClick={signIn}>Sign In</Button>
              {/* </center> */}
            </form>
            
          </div>
      </Modal>

      <div className="app__header">
        <img 
          className="app__headerImage"
          src="http://pngimg.com/uploads/instagram/instagram_PNG5.png" 
          alt="instagram"
        />
      </div>
      
      {user ? (
        <Button onClick={()=>auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={()=>setOpenSignIn(true)}>sign In</Button>
          <Button onClick={()=>setOpen(true)}>SIGN UP</Button>
        </div>
      )}

      {posts.map(({id, post})=>(
        <Post key={id} username={post.username}
        caption={post.caption}
        image={post.image}
      />
      ))}
    
    </div>
  );
}

export default App;
