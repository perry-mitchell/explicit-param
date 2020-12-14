import { Request, Response, NextFunction } from "express";

export interface ExplicitParam {
    invalidAction?: number | ResponseHandler | null;
    key: string | RegExp | Array<string | RegExp>;
    validator?: ParamValidator;
}

export interface ExplicitParamsOptions {
    extraParamsAction?: number | ResponseHandler;
    missingParamsAction?: number | ResponseHandler | null;
    params: Array<ExplicitParam>;
    source?: ParamSource;
}

export type ExplicitParamsValidator = (req: Request, res: Response, next: NextFunction) => void;

export type Parameters = {
    [key: string]: any
};

export enum ParamSource {
    PostBody = "body",
    QueryString = "query"
}

export type ParamValidator = (value: any, key: string) => boolean;

export type ResponseHandler = (req: Request, res: Response, next: NextFunction) => void;
