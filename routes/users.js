import express from 'express';
import { nanoid } from 'nanoid'

import { readFile } from 'fs/promises';
let userData = JSON.parse(
  await readFile(
    new URL('../data/users.json', import.meta.url)
  )
);

const router = express.Router();

router.get('/', (req, res) => {
    res.send(userData);
    console.log("Get request", userData);
});

router.post('/', (req, res) => {
  const newuserdata = req.body;

  userData.push({...newuserdata, id: nanoid()});
  res.send(userData);
  console.log("Post request", userData);
});

router.get('/:block', (req, res) => {
  // res.send(req.params);
  // console.log(req.params);

  // const { block } = req.params;
  res.send(userData.find((user) => user.id === req.params.block));
});

router.delete('/:block', (req, res) => {
  userData = userData.filter(user => user.id !== req.params.block);
  res.send(userData);
  console.log("Delete request", userData);
});

router.patch('/:block', (req, res) => {
  const { Name, Age } = req.body;
  const userToUpdate = userData.find(user => user.id === req.params.block);

  // if(Name) {
  //   userToUpdate.Name = Name;
  // }
  
  if(Name) userToUpdate.Name = Name;
  if(Age) userToUpdate.Age = Age;

  res.send(userData);
  console.log("Patch request", userData);
});


export default router;