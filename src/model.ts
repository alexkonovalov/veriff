export type Check = {
    id: string;
    priority: number;
    description: string;
};

export enum FormStatusEnum {
    initial,
    interactive,
    success,
    loading,
    error,
}
