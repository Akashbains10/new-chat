import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {type: String}
},
{timestamps: true}
);

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task; 