import express from "express";
import pkg from './generated/prisma/index.js';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).json(200);
})

app.get('/usuarios', async (req, res) => {
  let users;
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name : req.query.name
      }
    })
    
  } else {
    users = await prisma.user.findMany()
  }
  res.status(200).json(users);
});

app.put('/usuarios/:id', async (req, res) => {
  const usuarioAtualizado = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(200).json(usuarioAtualizado);
});

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({ mensagem: 'Usuario deletado com exito' })
});


app.listen(3000);