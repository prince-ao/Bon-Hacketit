import { Request, Response, NextFunction } from "express";

export function checkItemList(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    //console.log(req.body)
    // console.log(req)
    if(body.item_list == null){
        res.status(400).send({
            message: "expected item_list in body"
        });
        return;
    }
    else if (body.item_list.length == 0) {
        res.status(401).send({
            message: "item list cannot be empty"
        });
        return;
    }else {
        next();
    }
}