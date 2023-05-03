import RoleSchema from "../mongodb/models/Role.js";

// name: {
//     type:String,
//     unique: true
// },
// child:[String],
// email:{
//     type: String,
//     unique: true
// },
// password:String,
// parent:String,

export const First = async (req, res) => {
    try {
        res.status(200).send('hello to here');
    }
    catch (e) {

        res.status(404).send("Error");

    }
}

export const GetAll = async (req, res) => {
    try {
        const list = await RoleSchema.find({});
        res.status(200).send(list);
    }
    catch (e) {
        res.status(404).send("Error");
    }
}

export const UpdateParent = async (parent, total) => {
    try {
        if (!parent) return;
        const parent_data = await RoleSchema.findById(parent);
        total = +total;
        await RoleSchema.findOneAndUpdate({ _id: parent }, { target_sales_value: +parent_data.target_sales_value + total });
        await UpdateParent(parent_data.parent, +parent_data.target_sales_value + total);
    }
    catch (e) {
        res.status(404).send("Error");
    }
}

export const GetParent = async (id, data) => {
    try {
        if (!id) return;
        const parent_data = await RoleSchema.findById(id);

        data.push(parent_data);
        await GetParent(parent_data.parent, data);
        return;
    }
    catch (e) {
        res.status(404).send("Error");
    }
}

export const addNewRole = async (req, res) => {
    try {
        let { role, parent } = req.body;
        // console.log(parent);
        if (parent) {
            const parent_data = await RoleSchema.findById(parent);
            
            const newNode = await RoleSchema({
                role,
                parent,
            });

            // await UpdateParent(parent);

            const data = await newNode.save();
            parent_data.child.push(data._id);

            await parent_data.save();

            let response = {
                "errors": false,
                "message": "Role Added successfully",
                "data": parent_data
            };

            res.status(200).send(response);

        } else {
            const newNode = await RoleSchema({
                role,
            });
            const data = await newNode.save();
            res.status(200).send(data);
        }
    } catch (e) {
        res.status(404).send("Error : " + e);
    }
}

export const GetLevelCategoryInfo = async (req, res) => {
    try {
        const { level } = req.params;
        const list = await RoleSchema.find({ level: level });
        res.status(200).send(list);
    }
    catch (e) {
        res.status(404).send("Error");
    }
}

export const GetAllParentId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = []
        await GetParent(id, data);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(404).send("Error");
    }
}

