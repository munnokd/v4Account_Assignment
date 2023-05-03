import RoleSchema from "../mongodb/models/Role.js";
import jwt from 'jsonwebtoken'

const secretKey = "backend"

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

export const GetAllRole = async (req, res) => {
    try {
        const list = await RoleSchema.find({});
        
        res.status(200).send(list);
    }
    catch (e) {
        res.status(404).send("Error");
    }
}

export const Signup = async (req, res) => {
    try {
        await RoleSchema.findOneAndUpdate({ _id: req.body.id }, { name: req.body.name, email: req.body.email, password: req.body.password });

        const data = await RoleSchema.findOne({ _id: req.body.id })

        jwt.sign({ data }, secretKey, { expiresIn: '86400' }, (err, token) => {
            res.json({
                token
            })
        })
    }
    catch (e) {
        res.status(404).send("Error");
    }
}

export const Login = async (req, res) => {
    try {
        const data = await RoleSchema.findOne({ email: req.body.email });

        if (data) {
            const result = req.body.password === data.password;
            if (result) {
                jwt.sign({ data }, secretKey, { expiresIn: '86400' }, (err, token) => {
                    res.json({
                        token
                    })
                })
            } else {
                const response = {
                    "errors": true,
                    "message": "Password doesn't matched",
                    "data": null
                };

                res.status(200).send(response);
            }
        } else {
            const response = {
                "errors": false,
                "message": "Credential doesn't matched",
                "data": null
            };

            res.status(200).send(response);
        }
    }
    catch (e) {
        res.status(404).send("Error" + e);
    }
}

export const addNewRole = async (req, res) => {
    try {
        let { role, parent, name, email } = req.body;
        // console.log(parent);
        if (parent) {
            const parent_data = await RoleSchema.findById(parent);

            const newNode = await RoleSchema({
                role,
                parent,
                name,
                email,
            });

            const data = await newNode.save();
            parent_data.child.push(data._id);

            await parent_data.save();

            let response = {
                errors: false,
                message: "Role Added successfully",
                data: data,
            };

            res.status(200).send(response);
        } else {
            const newNode = await RoleSchema({
                role,
                name,
                email,
            });
            const data = await newNode.save();
            res.status(200).send(data);
        }
    } catch (e) {
        res.status(404).send("Error : " + e);
    }
};

export const getChild = async (req, res) => {
    try {
        const list = await RoleSchema.findOne({_id: req.body.id});

        let data = []

        data.push(list)

        for(let i = 0 ; i < list.child.length ; i++){
            const childData = await RoleSchema.findOne({_id: list.child[i]});
            data.push(childData)
        }
        
        res.status(200).send(data);
    }
    catch (e) {
        res.status(404).send("Error");
    }
}