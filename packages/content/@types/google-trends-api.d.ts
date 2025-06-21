declare module 'google-trends-api' {
    interface TrendsOptions {
        keyword?: string | string[];
        startTime?: Date;
        endTime?: Date;
        geo?: string;
        hl?: string;
        timezone?: number;
        category?: number;
        gprop?: string;
    }

    interface DailyTrendsOptions {
        geo?: string;
        hl?: string;
    }

    export function relatedQueries(options: TrendsOptions): Promise<string>;
    export function dailyTrends(options: DailyTrendsOptions): Promise<string>;
    export function interestOverTime(options: TrendsOptions): Promise<string>;
    export function interestByRegion(options: TrendsOptions): Promise<string>;
} 