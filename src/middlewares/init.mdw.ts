import { Request, Response, NextFunction } from 'express';

const init = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send();
    } catch (error) {
        next(error);
    }
    return next();
};

export default init;
