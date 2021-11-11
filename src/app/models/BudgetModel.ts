export interface BudgetModel {
    name: string;
    client: string;
    options: {
        web: {
            selected: boolean;
            pagesNumber: number;
            languagesNumber: number;
        },
        seo: boolean,
        sem: boolean
    },
    total: number;
    creationDate: Date;
}