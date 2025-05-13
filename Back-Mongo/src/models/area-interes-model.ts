import { Schema, model } from "mongoose";

const areaInteresSchema=new Schema(
    {
        nomArea:{
            type:String
        }
    },
    {
        versionKey: false,
    }
)

const areaInteres=model('areaInteres',areaInteresSchema,'AreaInteres')
export default areaInteres;