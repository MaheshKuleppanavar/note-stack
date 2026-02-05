const mongoose=require('mongoose');
const {Schema}=mongoose;
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/notes_manager');
}

main()
.then(()=>{
    console.log('Database Connected🔗');
})
.catch((err)=>{
    console.log(err);
})

const notesSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    title:{
    type:String,
    required:true
    },
}, { timestamps: true });

const Notes=mongoose.model('Notes',notesSchema)


module.exports=mongoose.model('Notes',notesSchema);