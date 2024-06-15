import { Injectable } from '@nestjs/common';
import { IBaseCollectionResult, IBaseSingleResult } from 'src/interface/base-result/base-result';
interface SingleResult {
    result: object | any,
    message?: string
    status : boolean
}
interface CollectionResult {
    results: [],
    message?: string
    status : boolean
}
interface CreateResult {
    status : boolean 
    result? : object | any,
    message?: string
}
interface ErrorResult {
    message?: string
    status : boolean
}
@Injectable()
export class BaseResultCommonService {
    public successSingleResult(params: SingleResult): IBaseSingleResult {
        return {
            result: params.result,
            error: '',
            errorMessage: '',
            status: params.status,
            status_code: 200,
            message: params.message ? params.message : 'OK'
        }
    }

    public successCollectionResult(params: CollectionResult): IBaseCollectionResult {
        return {
            results: params.results,
            error: '',
            errorMessage: '',
            status: params.status,
            status_code: 200,
            message: params.message ? params.message : 'OK'
        }
    }

    public createSuccess(params: CreateResult): IBaseSingleResult {
        return {
            result: params.result ? params.result : null,
            error: '',
            errorMessage: '',
            status: params.status,
            status_code: 200,
            message: params.message ? params.message : 'Created'
        }
    }

    public internalServerError(params: ErrorResult): IBaseSingleResult {
        return {
            result: null,
            error: '',
            errorMessage: '',
            status: params.status,
            status_code: 500,
            message: params.message ? params.message : 'Internal Server Error'
        }
    }
}
