import { Request, Response, NextFunction } from "express";
import status from "statuses";
import { ExplicitParamsOptions, Parameters, ParamSource, ResponseHandler } from "./types";

export function explicitParamsValidator(
    this: ExplicitParamsOptions,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const {
        extraParamsAction,
        missingParamsAction,
        params: parameters,
        source: paramSource
    } = this;
    if (!parameters || !paramSource) {
        throw new Error("Invalid/missing validator configuration");
    }
    // Get data
    let data: Parameters;
    switch (paramSource) {
        case ParamSource.PostBody:
            data = req.body;
            break;
        case ParamSource.QueryString:
            data = req.query;
            break;
        default:
            throw new Error(`Invalid parameter source: ${paramSource}`);
    }
    // Force data validity
    if (!data || typeof data !== "object") {
        throw new Error("Invalid parameter source: Not an object");
    }
    // Check missing / valid
    parameters.forEach(parameter => {
        const matchingParams = findKeys(parameter.key, data);
        // Check if missing
        if (Object.keys(matchingParams).length === 0) {
            if (missingParamsAction) {
                return invokeAction(req, res, next, missingParamsAction);
            }
        }
        // Check if all values are valid
        // @todo
    });
    // All passed, continue
    next();
}

function invokeAction(req: Request, res: Response, next: NextFunction, action: number | ResponseHandler): void {
    if (typeof action === "number") {
        res.status(action).send(status(action));
    } else if (typeof action === "function") {
        action(req, res, next);
    }
    throw new Error(`Invalid action: ${action}`);
}

function findKeys(matcher: string | RegExp | Array<string | RegExp>, source: Parameters): Parameters {
    const matchers = Array.isArray(matcher) ? matcher as Array<string | RegExp> : [matcher as string | RegExp];
    if (matchers.length <= 0) {
        throw new Error("No key matchers available for parameter lookup");
    }
    return Object.keys(source).reduce((output: Parameters, key: string) => {
        const keyMatches = matchers.some(matcher => {
            return matcher instanceof RegExp
                ? (<RegExp> matcher).test(key)
                : (<string> matcher) === key;
        });
        return keyMatches ? { ...output, [key]: source[key] } : output;
    }, {});
}
