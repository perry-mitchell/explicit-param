export interface ExplicitParam {
    key: string | RegExp | Array<string | RegExp>;
    validator?: (value: any) => boolean;
}

export interface ExplicitParamsOptions {
    extraParamsAction?: number | Function;
    missingParamsAction?: number | Function;
    params: Array<ExplicitParam>;
    source?: ParamSource;
}

export type ExplicitParamsValidator = (req: Express.Request, res: Express.Response, next: Function) => void;

export enum ParamSource {
    PostBody = "body",
    QueryString = "query"
}
