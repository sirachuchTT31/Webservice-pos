export interface IBaseCollectionResult {
    results?: object | any;
    status?: boolean;
    status_code?: number;
    message?: string;
    errorMessage?: string;
    error?: string;
}

export interface IBaseSingleResult {
    result?: object | any;
    status?: boolean;
    status_code?: number;
    message?: string;
    errorMessage?: string;
    error?: string;
}

export interface IBaseCollectionWithPangingResult {
    results?: [];
    status?: boolean;
    status_code?: number;
    totalRecord?: any | number;
    page?: any | number;
    perPage?: any | number;
    message?: string;
    errorMessage?: string;
}
export class ILogin {
    username: string | undefined;
    password: string | undefined;
}  
