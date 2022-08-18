export type Check = {
    id: string;
    priority: number;
    description: string;
};

export enum FormStatusEnum {
    Initial,
    Interactive,
    Success,
    Loading,
    Error,
}

export enum ButtonStatusEnum {
    Yes,
    No,
    Empty,
}
