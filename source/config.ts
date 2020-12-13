import { ExplicitParamsOptions, ParamSource } from "./types";

const DEFAULT_EXTRA_PARAMS_ACTION = 400;
const DEFAULT_INVALID_PARAM_ACTION = 400;
const DEFAULT_VALIDATOR = () => true;

export function normaliseConfig(
    config: ExplicitParamsOptions | Array<string>
): ExplicitParamsOptions {
    const isParamOptions = typeof config === "object";
    if (!isParamOptions && !Array.isArray(config)) {
        throw new Error("Invalid configuration: Expected ExplicitParamsOptions or Array<string>");
    }
    return {
        extraParamsAction: isParamOptions
            ? (<ExplicitParamsOptions>config).extraParamsAction || DEFAULT_EXTRA_PARAMS_ACTION
            : DEFAULT_EXTRA_PARAMS_ACTION,
        missingParamsAction: isParamOptions
            ? (<ExplicitParamsOptions>config).missingParamsAction || null
            : null,
        params: isParamOptions
            ? (<ExplicitParamsOptions>config).params.map(param => ({
                invalidAction: DEFAULT_INVALID_PARAM_ACTION,
                validator: DEFAULT_VALIDATOR,
                ...param
            }))
            : (<Array<string>>config).map(key => ({
                key,
                validator: DEFAULT_VALIDATOR,
                invalidAction: DEFAULT_INVALID_PARAM_ACTION
            })),
        source: isParamOptions ? (<ExplicitParamsOptions>config).source : ParamSource.PostBody
    };
}
