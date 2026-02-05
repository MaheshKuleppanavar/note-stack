const express=require('express');
const app=express();
const ejs=require('ejs');
const engine = require('ejs-mate');
const methodOverride = require('method-override')
const Notes=require('./model/Notes.js');
const ExpressError = require('./utils/ExpressError.js');
const path=require('path');
const {validateNotes,noteLimiter}=require('./Middleware.js');

app.engine('ejs', engine);
app.set('view engine',ejs);
app.set('views',path.join(__dirname,'/views'));

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.send('Root page working🤞');
})

app.get('/notes',async (req,res)=>{
    const notes=await Notes.find().sort({updatedAt:-1});
    res.render('index.ejs',{notes});
})

app.get('/notes/search',async (req,res)=>{
    let {q}=req.query;
    if(!q||q.trim().length===0){
        throw new ExpressError(401,'Search query parameter required')
    };
    q=q.trim();
    const searchRegex=new RegExp(q,'i');
    let notes=await Notes.find({
        $or:[
            {title:searchRegex},
            {content:searchRegex}
        ]
    });
    if(notes.length===0){
        throw new ExpressError(400,`No result found for '${q}`)
    }
    res.render('index.ejs',{notes});
});

app.get('/notes/new',(req,res)=>{
    res.render('new.ejs')
})


app.post('/notes',noteLimiter,validateNotes,async (req,res)=>{
    let {title,content}=req.body;
    title=title.trim();
    content=content.trim();
    const notes=new Notes({
        title,content
    });
    await notes.save();
    res.redirect('/notes');
});

app.get('/notes/:id/edit',async (req,res)=>{
    let {id}=req.params;
    let note=await Notes.findById(id);
    res.render('edit.ejs',{note});
})

app.put('/notes/:id', async (req,res)=>{
   let { id } = req.params;
   let updateData = {};

   if (req.body.title) {
      updateData.title = req.body.title.trim();
   }
   if (req.body.content) {
      updateData.content = req.body.content.trim();
   }

   const note = await Notes.findById(id);

   if (!note) {
      throw new ExpressError(404, "Note not found");
   }

   if (
     (updateData.title && updateData.title === note.title) &&
     (updateData.content && updateData.content === note.content)
   ) {
     return res.status(200).send(`<h2 style="color:red;text-align:center">No changes detected</h2>`);
   }

   const updatedNote = await Notes.findByIdAndUpdate(id, updateData, { new: true });
   res.redirect('/notes');
});


app.delete('/notes/:id',async (req,res)=>{
    let {id}=req.params;
    const note=await Notes.findByIdAndDelete(id);
    if(!note){
        throw new ExpressError(401,'Note you are trying to delete is not exist!')
    }
    return res.redirect('/notes');
});

app.use((req,res)=>{
    res.status(404).send('<h2>404 not found!</h2>')
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message='something went wrong!'}=err;
    res.render('error.ejs',{message});
});

app.listen(3000,(req,res)=>{
    console.log('Server started at http://localhost:3000🚀');
});