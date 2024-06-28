import "dotenv/config";

export const BDConfig={
    host:process.env.BD_HOST ?? '',
    port:process.env.BD_PORT ?? 5432,
    user:process.env.USER ?? 'postgres',
    password:process.env.PASSWORD ?? "root",
    database:process.env.DATABASE ?? ''
}