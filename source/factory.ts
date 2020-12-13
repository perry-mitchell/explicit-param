import { normaliseConfig } from "./config";
import { explicitParamsValidator } from "./validator";
import { ExplicitParamsOptions, ExplicitParamsValidator } from "./types";

export function explicitParams(
    config: ExplicitParamsOptions | Array<string>
): ExplicitParamsValidator {
    return explicitParamsValidator.bind(normaliseConfig(config));
    // const {
    //     params: parameters,
    //     source: dataSource
    // } = normaliseConfig(config);
    // return function _explicitParamsValidator(req: Express.Request, res: Express.Response, next: Function) {

    // };
}
