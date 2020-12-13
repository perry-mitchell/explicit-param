import { ExplicitParamsOptions } from "./types";

export function explicitParamsValidator(req: Express.Request, res: Express.Response, next: Function): void {
    const {
        params: parameters,
        source: dataSource
    } = <ExplicitParamsOptions> this;
    if (!parameters || !dataSource) {
        throw new Error("Invalid/missing validator configuration");
    }
    // Get data
}
